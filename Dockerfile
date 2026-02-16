FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar el archivo de proyecto
COPY MiBackendApi/MiBackendApi.csproj MiBackendApi/
RUN dotnet restore "MiBackendApi/MiBackendApi.csproj"

# Copiar todo el código y compilar
COPY MiBackendApi/. MiBackendApi/
WORKDIR /src/MiBackendApi
RUN dotnet publish "MiBackendApi.csproj" -c Release -o /app/publish

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
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "MiBackendApi.dll"]
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "MiBackendApi.dll"]
