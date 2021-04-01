### START
Docker and docker-compose are required to start app in dev environment.
Use command `docker-compose up` in a root level.
App ports:
 - symfony localhost:80
 - phpmyadmin localhost:8000   

### ASSET BUILDS
Production:
 - script `npm run build` uses webpack production mode without the source maps
Development:
 - script `npm run build:dev` uses webpack development mode with source maps 
 - script `npm run server:dev` keeps files in memory, except **entrypoints.json** that is required by the symfony webpack encore,
   with source maps. It's the fastest way to rebuild assets.  
