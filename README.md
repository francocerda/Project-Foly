# 🛒 Foly - Fake Store API

> **Foly** es un proyecto de una **API** para una tienda ficticia que permite gestionar productos, usuarios y pedidos de manera sencilla y eficiente. Creado con **Node.js** y **Express.js**, este proyecto está diseñado para ser flexible, rápido y fácil de usar.

---

## 👥 Creado por:
- **Franco Cerda**
- **José Meza**

---

## 🚀 ¿Qué es Foly?
**Foly** es una API RESTful que simula el funcionamiento básico de una tienda en línea. Nuestra idea es crear un entorno donde puedas:
- 📦 **Gestionar productos**: Listar, crear, actualizar y eliminar productos.
- 👤 **Gestionar usuarios**: Registrar y autenticar usuarios.
- 🛍️ **Realizar pedidos**: Crear y ver pedidos de los usuarios.

---

## 🛠️ Tecnologías utilizadas:
- **Node.js**: Para el entorno de ejecución de JavaScript del lado del servidor.
- **Express.js**: Framework para manejar las rutas y las funcionalidades de la API.
- **MongoDB** *(opcional)*: Para almacenar los productos, usuarios y pedidos (próximamente).
- **Postman**: Herramienta para probar la API durante el desarrollo.

---

## 📑 Estructura del proyecto:
```bash
Foly/
│
├── /routes        # Define las rutas de la API (endpoints)
│
├── /controllers   # Contiene la lógica para cada una de las rutas
│
├── /models        # Modelos de datos si usamos una base de datos
│
└── server.js      # Archivo principal que arranca el servidor
