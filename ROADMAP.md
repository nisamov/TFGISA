# Roadmap de Proyecto: TFGISA

## Despliegue e Implementación

### Infraestructura Base, Red y Hardening Inicial

> **Objetivo:** Establecer la conectividad, direccionamiento e infraestructura mínima de acceso seguro en todos los nodos.

* [ ] **Configuración de Red (M1, M2, M3):** Asignación de direccionamiento IP estático en la subred `192.168.1.0/24`:
* `192.168.1.1` (M1)
* `192.168.1.2` (M2)
* `192.168.1.3` (M3)

* [ ] **Acceso Remoto Seguro:** Fortificación del servicio SSH en los 3 nodos (autenticación estricta por par de claves, deshabilitación de acceso `root` y cambio de puertos por defecto).
* [ ] **Gestión de Credenciales:** Sustitución obligatoria de todas las contraseñas predeterminadas del sistema en M1, M2 y M3.
* [ ] **Filtrado Perimetral:** Configuración de reglas de cortafuegos (`UFW` / `iptables`) con política por defecto *deny all* y cierre de puertos no explícitamente necesarios.

### Servicios de Red y Alta Disponibilidad (M1 y M2)

> **Objetivo:** Desplegar los servicios centrales de resolución de nombres y asignación de red con redundancia.

* [ ] **Servicio DNS Redundante:**
* [ ] Despliegue del Servidor DNS Principal en **M1** (50% de la carga de resolución).
* [ ] Despliegue del Servidor DNS Esclavo en **M2** (50% de la carga de resolución).
* [ ] Pruebas de sincronización de zonas y tolerancia a fallos entre M1 y M2.

* [ ] **Servicio DHCP Redundante:**
* [ ] Configuración del servidor DHCP Principal en **M1**.
* [ ] Configuración del servidor DHCP Esclavo en **M2**.

### Núcleo de Aplicación, Base de Datos y Web (M3)

> **Objetivo:** Desplegar y asegurar el motor de la red social, la base de datos MySQL y la capa de entrada web.

* [ ] **Base de Datos Principal:**
* [ ] Instalación, optimización y hardening del motor **MySQL** en **M3**.
* [ ] Restricción estricta de permisos y accesos al motor de BDD.

* [ ] **Plataforma de Red Social:**
* [ ] Despliegue e integración de **Matrix Synapse** en **M3** conectado a la BDD MySQL local.
* [ ] Protección y restricción de permisos de lectura/escritura sobre los archivos de configuración de Matrix Synapse.

* [ ] **Capa Web y Proxy Inverso:**
* [ ] Instalación y configuración de **Apache2** como Proxy Inverso en **M3**.
* [ ] Implementación de directivas de seguridad para la mitigación de ataques web habituales.
* [ ] Configuración de cifrado TLS/SSL (Certbot / Let's Encrypt) para HTTPS y WSS.

### Estrategia de Copias de Seguridad y Automatización (M3 y M2)

> **Objetivo:** Asegurar la persistencia, cifrado, purga automática y replicación remota de los datos.

* [ ] **Copia de Seguridad Local (M3):**
* [ ] Script automatizado vía `cron` para volcados periódicos cifrados de la base de datos MySQL.
* [ ] Implementación de política de rotación automática para la purga de respaldos mayores a 30 días (`find -mtime +30`).


* [ ] **Copia Secundaria de Respaldo (M2):**
* [ ] Automatización de la transferencia cifrada de respaldos desde **M3** hacia **M2** (`rsync` sobre SSH).
* [ ] Hardening del nodo **M2** restringiendo el acceso exclusivo a los volúmenes de copia de seguridad.

### Monitorización, Analítica y Alertas (M1)

> **Objetivo:** Centralizar el análisis de métricas, consumo de recursos y estado de contenedores.

* [ ] **Agentes de Métricas:** Despliegue de **cAdvisor** en **M1** (y agentes en el resto de máquinas) para recolección de rendimiento del sistema y contenedores.
* [ ] **Servidor de Analíticas:** Despliegue y configuración de **Grafana** en **M1** para la creación de cuadros de mando visuales.
* [ ] **Notificaciones por Telegram (M1):**
* [ ] Desarrollo y despliegue del Bot de Telegram en **M1**.
* [ ] Vinculación del bot al sistema de analíticas para el envío automático de alertas por consumo o caídas.

### Bots de Discord e Integración de Eventos (M2)

> **Objetivo:** Desplegar servicios de integración y bots auxiliares con aislamiento de seguridad.

* [ ] **Despliegue de Bots de Discord:** Configuración de la estructura de bots (`/bots/{ex1..ex3}`) en **M2**.
* [ ] **Aislamiento de Credenciales:** Configuración de los bots como servicios del sistema (`systemd`) aislando los tokens mediante variables de entorno protegidas.
* [ ] **Notificación de Eventos:** Integración de alertas e interacciones del sistema hacia canales dedicados de Discord.

### Pruebas de Estrés, Auditoría y Memoria TFG

> **Objetivo:** Validar globalmente la infraestructura y finalizar la documentación académica.

* [ ] **Auditoría de Hardening:** Escaneo con `Nmap`, verificación de puertos cerrados y validación de certificados TLS.
* [ ] **Pruebas de Alta Disponibilidad y Disaster Recovery (DRP):**
* [ ] Simulación de caída del DNS Principal (**M1**) y verificación de conmutación al esclavo (**M2**).
* [ ] Simulación de pérdida de datos en **M3** y restauración desde la copia cifrada de **M2**.

* [ ] **Pruebas de Carga:** Evaluación del rendimiento de Matrix Synapse y Apache2 bajo peticiones concurrentes.
* [ ] **Memoria del TFG:** Redacción final de la memoria, anexos de configuración y manuales de administración.