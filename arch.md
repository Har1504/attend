# Attendance Tracker - Laptop-Optimized Product Design (Firebase Integrated)

## Core Features
- *Authentication & Security*
  - Firebase Authentication with Email + Password
  - Role-based access (Admin, Member) managed via Firestore custom claims
- *Attendance Tracking*
  - One-click check-in & check-out with automatic timestamp
  - Prevent duplicate check-ins per user per day
  - Status: Present, Absent, Leave
  - Auto-calculate total working hours
- *Dashboard & Reports*
  - Laptop-optimized dashboard with KPI cards, tables, and charts
  - KPIs: Total Present, Absent, Late, On Leave
  - Attendance history with date & status filters
  - CSV export
  - Weekly/monthly charts with hover tooltips
- *Leave Management*
  - Members request leave (calendar date picker, reason)
  - Admin approves/rejects requests
  - Status reflected in attendance logs

---

## Advanced Laptop-Responsive Frontend Design

### Frameworks & Libraries
- Next.js (latest) for SSR + routing
- Tailwind CSS with custom desktop-first breakpoints
- Shadcn UI for cards, tables, forms, modals
- Framer Motion for component transitions
- Lucide-react icons
- Recharts for data visualization
- React Query for Firestore data hooks

### Layout
- *Grid System*
  - 3-column layout for laptop screens (≥1280px width)
  - KPI cards in first row with equal width
  - Sidebar pinned left with scrollable content
- *Navigation*
  - Vertical sidebar with icons + labels
  - Top navbar showing user profile, notifications
- *Dashboard Widgets*
  - KPI cards with gradient headers & animated numbers
  - Line chart for daily attendance
  - Pie/donut chart for status distribution
- *Tables*
  - Wide, paginated, and scrollable horizontally on laptop screens
  - Sortable by user, date, or status
  - Status shown via colored badges
- *Forms*
  - Leave request modal optimized for laptop width
  - Inline validation & clear error messages
  - Date picker styled for large-screen usability

### Laptop UX Highlights
- Default width: 1440px container with centered grid
- No cramped mobile-style stacking on laptop view
- Sidebar visible at all times (collapsible only on tablets)
- Charts and tables expand to use available horizontal space
- Hover effects and tooltips for all interactive elements

### Pages
- *Login Page*
  - Laptop-friendly centered card
  - Firebase email/password login
- *Dashboard*
  - Row of KPI cards (Present Today, Absent, On Leave, Total Members)
  - Two-column chart area (Line + Pie)
- *Attendance Table*
  - Large paginated table with sticky header
  - Filters for date range, status, user
  - CSV export button
- *Leave Management*
  - Table of leave requests with action buttons
  - Modal form for new leave requests
- *Admin Panel*
  - Manage users
  - Approve/reject leave requests

---

## Firebase Backend & Database

- *Authentication*
  - Firebase Auth (email/password)
  - Role claims (admin, member) stored in Firestore

- *Firestore Schema*
  - *users*
    - uid (string, doc id)
    - name
    - email
    - role (admin | member)
    - created_at (timestamp)
  - *attendance*
    - id (auto id)
    - user_id (uid ref)
    - date (YYYY-MM-DD string)
    - check_in (timestamp)
    - check_out (timestamp)
    - status (present | absent | leave)
    - total_hours (float)
  - *leave_requests*
    - id (auto id)
    - user_id (uid ref)
    - start_date (timestamp)
    - end_date (timestamp)
    - reason (string)
    - status (pending | approved | rejected)
    - created_at (timestamp)

- *Cloud Functions*
  - checkIn: validates one check-in per user per day
  - checkOut: calculates total hours
  - approveLeave: admin action to approve/reject leave

---

## Deployment
- *Frontend:* Vercel (optimized for laptop screens)
- *Backend & Database:* Firebase Hosting + Firestore + Cloud Functions
- *CI/CD:* GitHub Actions

---

## UX Goals
- Primary: *Laptop-optimized SaaS dashboard experience*
- Target resolution: 1366px – 1920px widths
- Clean 3-column grid layout
- Minimal scrolling on laptop screens
- Responsive fallback for tablets & mobile, but laptop view prioritized
- Smooth animations with Framer Motion