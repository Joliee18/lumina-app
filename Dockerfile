FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar el archivo de proyecto
COPY MiBackendApi/MiBackendApi.csproj MiBackendApi/
RUN dotnet restore "MiBackendApi/MiBackendApi.csproj"

# Copiar todo el código y compilar
COPY MiBackendApi/. MiBackendApi/
WORKDIR /src/MiBackendApi
RUN dotnet publish "MiBackendApi.csproj" -c Release -o /app/publish

# Imagen final con .NET 9.0
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "MiBackendApi.dll"]
