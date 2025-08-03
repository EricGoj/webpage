# Eric Quevedo - Personal Portfolio

This is my personal portfolio, a place to showcase my professional experience, projects, and articles. The site is designed to be clean, modern, and fully responsive, with a focus on user experience and animations.

## ✨ Features

- **Interactive UI**: Smooth animations and transitions powered by `anime.js`.
- **Internationalization (i18n)**: Support for English and Spanish, easily switchable.
- **Responsive Design**: Looks great on all devices, from mobile to desktop.
- **Dynamic CV Download**: Download the correct resume version based on the selected language.
- **Dark Mode**: Sleek and modern dark theme.

## 🛠️ Technologies Used

- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Anime.js](https://animejs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Internationalization**: Custom solution using Svelte stores.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Development

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Run the development server:**

    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

### Building for Production

To create a production version of the app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

## 🐳 Running with Docker

This project includes a `Dockerfile` and `docker-compose.yml` for easy containerization.

1.  **Build and run the container:**

    ```sh
    docker-compose up --build
    ```

2.  The application will be available at `http://localhost:4173`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
