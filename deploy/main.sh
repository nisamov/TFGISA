#!/bin/bash

# Instalacion k8s
##sudo snap install microk8s --classic

# Asignar permisos a un usuario
##sudo usermod -a -G microk8s $USER
##mkdir -p ~/.kube
##sudo chown -f -R $USER ~/.kube
##newgrp microk8s

# Aplicar complementos (DNS y red)
##microk8s enable dns storage

# Asignar alias para acceso rapido
##echo "alias kubectl='microk8s kubectl'" >> ~/.bashrc
##source ~/.bashrc

# Verificación de estado
##kubectl get nodes

# Aplicacion forzosa y accion por kubernetes
##kubectl apply -f deployment.yaml

# Inspeccion de servicio
##kubectl get pods
##kubectl get services
##kubectl get configmaps

# Revision de logs
##kubectl logs -l app=mi-app --tail=50

echo "Descomentar cuando aplique"