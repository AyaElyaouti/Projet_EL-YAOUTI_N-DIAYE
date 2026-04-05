1. Présentation du Projet
L'objectif de ce projet est la mise en place d'une application distribuée composée de deux microservices (user-service et task-service). L'architecture repose sur des principes de scalabilité, de découplage et de haute disponibilité grâce à l'orchestration via Kubernetes.

Au lieu d'avoir un seul gros programme, on a divisé l'application en deux parties indépendantes :
- Service Utilisateurs : On l'utilise pour gérer la liste des membres.
- Service Tâches : On l'utilise pour créer des choses à faire et les enregistrer dans une Base de Données (PostgreSQL).


#Contenu du projet
user-service/ : Le code pour la gestion des utilisateurs.

task-service/ : Le code pour la gestion des tâches et la connexion à la base de données.

Dockerfile : La "recette" pour transformer le code en image Docker.

deployment.yaml : Les instructions pour que Kubernetes lance les programmes.

service.yaml : Le système qui permet aux services de s'appeler entre eux.

ingress.yaml : La porte d'entrée unique pour accéder à tout le projet.

1. La mise en boîte (Docker)
Chaque service est placé dans un conteneur Docker. De cette façon, on s'assure que le programme marche partout de la même façon, peu importe l'ordinateur.

2. L'organisation (Kubernetes)
On utilise Kubernetes pour faire tourner ces boîtes. Si une boîte s'arrête par erreur, Kubernetes la relance automatiquement.

3. La discussion (Communication)
Le service des tâches a besoin de savoir qui sont les utilisateurs. Pour cela, on utilise Axios pour envoyer un message interne au service utilisateur.

4. La mémoire (Base de données)
Pour ne pas perdre les données, on utilise PostgreSQL. Les tâches sont enregistrées durablement dans une table SQL.

5. L'aiguillage (Ingress)
L'Ingress sert de guide. Quand on tape une adresse, c'est lui qui décide si on est envoyé vers le service des utilisateurs ou vers celui des tâches.


Comment lancer le projet ?
Démarrer Minikube : minikube start

Activer l'entrée (Ingress) : minikube addons enable ingress

Lancer tous les composants :

kubectl apply -f user-service/

kubectl apply -f task-service/

kubectl apply -f ingress.yaml

Comment tester le fonctionnement ?
Pour vérifier que le service tourne : Accéder à /

Pour voir la liste des tâches : Accéder à /tasks

Pour vérifier que les services se parlent : Accéder à /tasks-with-users
