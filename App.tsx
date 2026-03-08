@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: #333;
  background-color: #f8f9fa;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  background-color: #f0f2f5;
}

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  width: 100%;
}

h1, h2, h3, h4, h5, h6 {
  color: #212529;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 600;
  line-height: 1.2;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #495057;
}

a {
  font-weight: 500;
  color: #007bff;
  text-decoration: inherit;
}
a:hover {
  color: #0056b3;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;
}
button:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  box-sizing: border-box;
  font-size: 1rem;
  color: #495057;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: left;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #343a40;
}

.error-message {
  color: #dc3545;
  font-size: 0.875em;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

/* Header */
.header {
  background-color: #212529;
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.header h1 {
  margin: 0;
  color: white;
  font-size: 1.8rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a:hover {
  color: #adb5bd;
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
}

/* Footer */
.footer {
  background-color: #212529;
  color: white;
  padding: 1.5rem 2rem;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 2rem;
  border-radius: 0 0 8px 8px;
}

.footer p {
  margin: 0;
  color: #adb5bd;
}

/* Card styles */
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card h3 {
  color: #007bff;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.card p {
  color: #495057;
  line-height: 1.6;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  #root {
    padding: 1rem;
  }

  .container {
    padding: 1.5rem;
    margin: 1rem auto;
  }
}
