# Spring Project Frontend

Modern product management UI built with React + Vite.

## Features

- Add products
- Fetch products
- Modern glassmorphism styling
- Responsive layout for desktop and mobile

## Backend Connection

Your backend folder path can stay at:

`E:\fswd\product-management-backend`

The frontend cannot use a local folder path directly. It must call a running backend URL.

1. Run your backend server and note the URL, for example: `http://localhost:5000`
2. Create `.env` in this frontend root
3. Add:

```env
VITE_API_URL=http://localhost:5000
```

## Run Frontend

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
