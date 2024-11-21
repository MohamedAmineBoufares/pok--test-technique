# **Pokémon Frontend + GraphQL**

A project to explore Pokémon data using a GraphQL API. This guide will walk you through setting up and running the project.

---

## 🚀 **Tech Stack**

This project utilizes modern web technologies for a fast and responsive user experience:

### **Core Tools**

- **React**: For building dynamic and interactive user interfaces.
- **Vite**: A lightning-fast build tool and development server.
- **TailwindCSS**: For styling with a utility-first CSS framework.
- **ShadCN**: For customizable and accessible UI components.
- **GraphQL**: To fetch Pokémon data efficiently using structured queries.

### **Prerequisites**

Make sure you have the following tools installed:

- **Node.js**: _(v20.17.0)_
- **Pnpm**: _(v9.12.2)_

---

## 🛠️ **Setup and Run the Project**

Follow these steps to set up and run the development server:

### 1. Clone the repository\*\*

```bash
git clone git@github.com:MohamedAmineBoufares/poke-test-technique.git
```

### 2. Navigate to the project folder

```bash
cd poke-test-technique
```

### 3. Inside the cloned folder run the below command to install dependencies

```bash
pnpm i
```

### 4. After installation is complete, run the below command to run the dev server

```bash
pnpm start:local
```

### 5. You should be able to see the dev server on [localhos:3000](http://localhost:3000/)

---

## About `.env`

The repo should include a `.env` file, if not, create it on the root of the project with this content

```bash
VITE_POKE_URL=https://beta.pokeapi.co/graphql/v1beta
```

---

## 📬 Contact

For questions or feedback, reach out to medamineboufares@gmail.com.
