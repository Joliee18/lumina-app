<<<<<<< HEAD
﻿FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
=======
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
>>>>>>> 9b8ff7259fbe0e44ffaf7db345f7d69688291048
WORKDIR /src

# Copiar el archivo de proyecto
COPY MiBackendApi/MiBackendApi.csproj MiBackendApi/
RUN dotnet restore "MiBackendApi/MiBackendApi.csproj"

# Copiar todo el código y compilar
COPY MiBackendApi/. MiBackendApi/
WORKDIR /src/MiBackendApi
RUN dotnet publish "MiBackendApi.csproj" -c Release -o /app/publish

<<<<<<< HEAD
# Imagen final con .NET 9.0
=======
# Imagen finalFROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar el archivo de proyecto
COPY MiBackendApi/MiBackendApi.csproj MiBackendApi/
RUN dotnet restore "MiBackendApi/MiBackendApi.csproj"

# Copiar todo el código
COPY MiBackendApi/. MiBackendApi/

# Publicar (NOTA: estamos en /src, no en /src/MiBackendApi)
RUN dotnet publish "MiBackendApi/MiBackendApi.csproj" -c Release -o /app/publish

# Imagen final
>>>>>>> 9b8ff7259fbe0e44ffaf7db345f7d69688291048
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
<<<<<<< HEAD
ENTRYPOINT ["dotnet", "MiBackendApi.dll"]
=======
ENTRYPOINT ["dotnet", "MiBackendApi.dll"]
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "MiBackendApi.dll"]
>>>>>>> 9b8ff7259fbe0e44ffaf7db345f7d69688291048
