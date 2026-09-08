# MediConnect Codebase Summary

## System overview

MediConnect is a healthcare appointment platform built as three applications.

| Application | Responsibility | Stack |
| --- | --- | --- |
| `frontend/` | Patient-facing website | React, Vite, Tailwind CSS, Axios |
| `backend/` | REST API and persistence | Express, MongoDB/Mongoose, JWT, Cloudinary |
| `admin/` | Administrator dashboard | React, Vite, Tailwind CSS, Axios |

```text
Patient frontend --+
                   +-- HTTP / JSON --> Express API --> MongoDB
Admin panel -------+                        |
                                            +-- image uploads --> Cloudinary
```

Both React apps get their API base URL from `VITE_BACKEND_URL`. The API uses
environment variables for MongoDB, Cloudinary, JWT, and administrator credentials.

## Frontend — patient experience

### Foundation and routes

`src/main.jsx` mounts React within `BrowserRouter` and `AppContextProvider`.
`src/App.jsx` provides the shared navigation, footer, toast messages, and routes.

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/doctors` | All doctors |
| `/doctors/:speciality` | Specialty-filtered directory |
| `/appointment/:docId` | Doctor details and slot selection |
| `/login` | Patient sign-up and login |
| `/my-profile` | Patient-profile UI |
| `/my-appointments` | Appointment UI |
| `/about`, `/contact` | Informational pages |

### Shared state and API use

`AppContext.jsx` is the patient app's central state layer. At startup it calls
`GET /api/doctor/list`, stores the doctors, and exposes them to all components.
It also restores the patient token from `localStorage`, stores the backend URL,
currency symbol, and sign-in form values.

### Home and doctor-discovery flow

The home page composes `Header`, `SpecialityMenu`, `TopDoctors`, and `Banner`.
The specialty menu links to a filtered doctor route, while the top-doctor cards
come from the API data. `Doctors.jsx` reads the specialty route parameter,
filters the context data, and navigates to a chosen doctor's appointment page.

```text
Home → specialty menu or doctor card → /doctors/:speciality
     → filtered doctor cards → /appointment/:docId
```

### Doctor details and booking-selection UI

`Appointment.jsx` finds the requested doctor in context and shows their image,
education, specialty, experience, biography, and fee. It generates 30-minute
slots from 10:00 to 21:00 for the next seven days; patients can choose a day and
time. `RelatedDoctors` recommends up to five doctors sharing the specialty.

```text
Doctor detail → generated seven-day schedule → day selection → time selection
              → “Book an appointment” button
```

The booking control has no API request yet, so selected slots are not persisted.

### Authentication and patient account UI

`Login.jsx` uses one form for registration and login. Registration posts
`name`, `email`, and `password` to `/api/user/register`; login posts credentials
to `/api/user/login`. A successful response saves `token` in `localStorage` and
updates the context. `NavBar` then shows profile and logout options; logout
clears the stored token.

`MyProfile.jsx` currently edits local sample data only. `MyAppointments.jsx`
uses the first three doctors as example appointments with static date/time;
payment and cancellation buttons are presentational. The contact form is also
presentational.

### Reusable UI

`src/components/` holds the navigation, footer, hero, specialty menu, doctor
cards, related-doctor recommendations, and CTA banner. Images, icons, specialty
data, and doctor assets live in `src/assets/`; styling uses Tailwind plus
`src/index.css`.

## Backend — API, security, and data

### Server flow

`backend/server.js` creates the Express app, enables JSON parsing and CORS,
connects MongoDB and Cloudinary, then registers the following router groups:

```text
server.js
  |-- /api/user   -> userRoutes.js
  |-- /api/doctor -> doctorRoute.js
  `-- /api/admin  -> adminRoute.js
```

`config/mongodb.js` connects to the `mediconnect` database. `config/cloudinary.js`
initializes image hosting. The default port is 4000.

### Data models

`userModel.js` defines patient name, unique email, hashed password, image,
address, gender, date of birth, and phone. `doctorModel.js` defines doctor
identity, hashed credentials, Cloudinary image URL, specialty, qualifications,
experience, biography, fee, address, availability, creation date, and a
`slots_booked` object reserved for booking information.

### User APIs

| Endpoint | Protection | Behaviour |
| --- | --- | --- |
| `POST /api/user/register` | — | Validates details, hashes password, creates user, returns JWT |
| `POST /api/user/login` | — | Verifies bcrypt password, returns JWT |
| `GET /api/user/get-profile` | `authUser` | Returns the authenticated user without password |
| `POST /api/user/update-profile` | Multer + `authUser` | Intended profile update and optional image upload |

`authUser.js` verifies the `token` header and stores the decoded user ID on the
request object.

### Doctor-discovery API

`GET /api/doctor/list` returns every doctor while excluding password and email.
This is the data source for patient filtering, doctor cards, detail screens, and
related-doctor recommendations.

### Admin APIs and flow

```text
Admin login → POST /api/admin/login → signed JWT (aToken)
            → protected request with aToken header → authAdmin verification
            → controller reads or changes doctor records
```

| Endpoint | Purpose |
| --- | --- |
| `POST /api/admin/login` | Validates configured admin credentials and returns a JWT |
| `POST /api/admin/add-doctor` | Adds a doctor with multipart image upload |
| `GET /api/admin/all-doctors` | Returns all doctors except passwords |
| `POST /api/admin/change-availability` | Toggles one doctor's availability |

`addDoctor` validates its request, hashes the password, uploads the image to
Cloudinary, parses the address JSON, and saves the doctor in MongoDB. `authAdmin`
verifies the `atoken` header against the configured admin identity.

### Current backend note

`updateProfile` is intended to update patient data, but its signature accepts
one parameter even though it uses `req` and `res`. It needs `(req, res)` before
the endpoint can execute. The frontend profile page has not yet been connected
to this API.

## Admin panel — operations interface

### Foundation and access control

`admin/src/main.jsx` wraps the app in router, admin, doctor, and app context
providers. `AdminContext` restores `aToken` from `localStorage` and provides
the helpers for fetching doctors and toggling availability. `App.jsx` renders
the login screen without a token; with a token, it renders the `NavBar`,
`SideBar`, routes, and toast messages.

### Pages

| Route | Current implementation |
| --- | --- |
| `/admin-dashboard` | Dashboard placeholder |
| `/all-appointments` | Appointments placeholder |
| `/add-doctor` | Functional doctor-creation form |
| `/doctors-list` | Functional doctor list and availability control |

### Login flow

`pages/Login.jsx` posts credentials to `/api/admin/login`. On success it saves
the token as `aToken`, which switches the app to the administrative layout.
The Doctor login toggle is currently visual only; no doctor-authentication flow
exists yet. Logout clears `aToken` in state and local storage.

### Add-doctor flow

`AddDoctor.jsx` collects a photo, credentials, professional details, fee,
address, and biography. It builds `FormData`, serializes the address JSON, and
sends it with the admin token.

```text
Admin form + photo → FormData → POST /api/admin/add-doctor
                  → Multer → Cloudinary image upload → MongoDB doctor record
                  → success toast and form reset
```

### Doctor-list flow

`DoctorsList.jsx` fetches doctors after admin authentication. Each card shows
the doctor image, name, specialty, and `available` checkbox. Changing it calls
`POST /api/admin/change-availability`; the context reloads the list after a
successful update so the screen reflects MongoDB.

## End-to-end flow implemented today

```text
1. An administrator signs in and creates a doctor with a profile image.
2. The API validates input, uploads the image, and saves the doctor.
3. The patient app retrieves the public doctor directory.
4. A patient filters by specialty and opens a doctor profile.
5. The patient selects a generated date/time slot in the interface.
6. An administrator can enable or disable doctor availability.
```

## Remaining integration work

The current foundation supports doctor discovery and doctor administration.
Next steps are appointment persistence, payment, appointment listing and
cancellation, live profile fetching/updating, doctor login, and completing the
admin dashboard and appointments pages.
