# Proyecto TFG - Infraestructura, Despliegue y Automatización de Red Social

## Descripción General

Este proyecto abarca el diseño, despliegue, automatización, monitorización y endurecimiento (*hardening*) de una infraestructura de red dedicada a dar soporte a una red social distribuida basada en **Matrix Synapse**.

La arquitectura está diseñada sobre una topología de tres nodos principales con el fin de garantizar alta disponibilidad en servicios clave (DNS y bases de datos), observabilidad en tiempo real y protección perimetral de la aplicación.

## Objetivos Técnicos

* **Despliegue y Escalabilidad:** Configuración de la plataforma de comunicación Matrix Synapse sobre un servidor web Apache2 y proxy inverso.
* **Redundancia y Alta Disponibilidad:** Balanceo de carga en la resolución DNS (50/50 entre nodo principal y secundario) y sistema redundante de copias de seguridad de datos.
* **Monitorización e Inteligencia:** Recolección de métricas de contenedores y recursos del sistema mediante **cAdvisor** y **Grafana**, conectados a bots automatizados para alertas.
* **Seguridad y Hardening:** Protección contra ataques web, cifrado de copias de seguridad, aislamiento de credenciales y rotación automatizada de archivos.

## Catálogo de Servicios

### Servicios Críticos (Alta Relevancia)

* **Red Social:** Matrix Synapse
* **Servicios Web y Reenvío:** Proxy Inverso y Servidor Web (Apache2)
* **Almacenamiento de Datos:** Base de Datos Principal (MySQL) y Sistema de Copias de Seguridad Local
* **Resolución de Nombres y Red:** Servidor DNS Principal y Servidor DHCP Principal

### Servicios Auxiliares (Generales)

* **Monitorización y Analítica:** Grafana + cAdvisor
* **Sistemas de Notificación:** Bots de Telegram (alertas basadas en analíticas) y Bots de Discord (`/bots/{ex1..ex3}`)
* **Redundancia:** Servidor DNS Esclavo, Servidor DHCP Esclavo y Copia Secundaria de Base de Datos

## Inventario de Nodos y Topología

| Nodo | Dirección IP | Servicios Alojados | Función Principal |
| :--- | :--- | :--- | :--- |
| **M1** | `192.168.1.1` | • Servidor DNS Principal (50% carga)<br>• Grafana + cAdvisor<br>• Bots de Telegram | Monitorización, analítica de métricas y resolución DNS principal |
| **M2** | `192.168.1.2` | • Servidor DNS Esclavo (50% carga)<br>• Bots de Discord (`/bots/{ex1..ex3}`)<br>• Copia Secundaria de Base de Datos | Redundancia de DNS, bots auxiliares y respaldo secundario |
| **M3** | `192.168.1.3` | • Proxy Inverso<br>• Servidor Web (Apache2)<br>• Base de Datos (MySQL)<br>• Matrix Synapse (Red Social)<br>• Copia de Base de Datos Local | Núcleo de la red social, almacenamiento y gestión del tráfico web |

## Directivas de Seguridad y Hardening

### Nodo M1 (`192.168.1.1/24`)

* **Control de Acceso:** Acceso remoto exclusivo mediante SSH seguro con credenciales endurecidas.
* **Filtrado de Tráfico:** Cierre explícito de puertos no esenciales mediante reglas de cortafuegos.
* **Gestión de Identidad:** Sustitución obligatoria de todas las contraseñas predeterminadas del sistema.

### Nodo M2 (`192.168.1.2/24`)

* **Gestión de Secretos:** Aislamiento de tokens de bots de Discord ejecutados como servicios del sistema (variables de entorno protegidas).
* **Protección de Datos:** Control de acceso restringido a los volúmenes de la copia de seguridad secundaria de la base de datos.
* **Gestión de Identidad:** Sustitución obligatoria de contraseñas base.

### Nodo M3 (`192.168.1.3/24`)

* **Seguridad Aplicativa:** Filtrado de peticiones y mitigación de vectores de ataque web habituales sobre el servidor Apache2 y el Proxy Inverso.
* **Protección de Base de Datos y Servicios:** Endurecimiento del motor MySQL y restricción de lectura/escritura a los archivos de configuración de Matrix Synapse.
* **Gestión de Respaldos:** Cifrado de las copias de seguridad de la base de datos y automatización de la purga de respaldos con antigüedad mayor a 30 días.
* **Gestión de Identidad:** Sustitución de contraseñas predeterminadas del sistema y servicios.