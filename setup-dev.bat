@echo off
echo 🚀 Songs Microservice - Development Setup
echo ========================================

echo 📋 Checking Docker status...
docker version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running! Please start Docker Desktop first.
    pause
    exit /b 1
)

echo ✅ Docker is running!

echo.
echo 🗃️  Starting SQL Server container...
docker run --name sqlserver-dev -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest

if errorlevel 1 (
    echo ℹ️  Container might already exist, trying to start it...
    docker start sqlserver-dev
)

echo ⏳ Waiting for SQL Server to be ready (30 seconds)...
timeout /t 30 /nobreak

echo.
echo 🔧 Setting up database...
docker exec -i sqlserver-dev /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd123 -Q "
USE [master];
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'usr_polimusic_gr2' AND type = 'S')
BEGIN
    CREATE LOGIN [usr_polimusic_gr2] WITH PASSWORD = N'Politecnica1', DEFAULT_DATABASE = [master], CHECK_EXPIRATION = OFF, CHECK_POLICY = OFF;
    PRINT 'Login created successfully.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = 'BDD_PoliMusic_Song')
BEGIN
    CREATE DATABASE [BDD_PoliMusic_Song];
    PRINT 'Database created successfully.';
END;

USE [BDD_PoliMusic_Song];

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'usr_polimusic_gr2')
BEGIN
    CREATE USER usr_polimusic_gr2 FOR LOGIN usr_polimusic_gr2 WITH DEFAULT_SCHEMA = [dbo];
    EXEC sp_addrolemember N'db_owner', N'usr_polimusic_gr2';
    PRINT 'User created and configured successfully.';
END;

IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TBL_SONG]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[TBL_SONG](
        [ID_SONG] [int] IDENTITY(1,1) NOT NULL,
        [SONG_NAME] [varchar](50) NOT NULL,
        [SONG_PATH] [varchar](255) NOT NULL,
        [PLAYS] [int] NULL DEFAULT 0,
        CONSTRAINT [PK_TBL_SONG_MS] PRIMARY KEY CLUSTERED ([ID_SONG] ASC) ON [PRIMARY]
    ) ON [PRIMARY];
    PRINT 'Table created successfully.';
END;

IF NOT EXISTS (SELECT 1 FROM [dbo].[TBL_SONG])
BEGIN
    INSERT INTO TBL_SONG (SONG_NAME, SONG_PATH, PLAYS) VALUES
    ('Adventure','../songFiles/bensound-adventure.mp3', 0),
    ('Buddy','../songFiles/bensound-buddy.mp3', 0),
    ('Dance','../songFiles/bensound-dance.mp3', 0),
    ('Dreams','../songFiles/bensound-dreams.mp3', 0),
    ('Energy','../songFiles/bensound-energy.mp3', 0);
    PRINT 'Sample data inserted successfully.';
END;

SELECT COUNT(*) as 'Total Songs' FROM TBL_SONG;
"

if errorlevel 1 (
    echo ❌ Database setup failed!
    pause
    exit /b 1
)

echo.
echo ✅ Database is ready!
echo 📊 SQL Server running on: localhost:1433
echo 🗃️  Database: BDD_PoliMusic_Song
echo 👤 User: usr_polimusic_gr2
echo.
echo 🚀 Now you can start the NestJS development server:
echo    npm run start:dev
echo.
echo 📝 To stop the database later:
echo    docker stop sqlserver-dev
echo.
pause
