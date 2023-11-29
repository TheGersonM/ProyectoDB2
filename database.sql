CREATE DATABASE CentroMedicoLaPaz;
go
USE CentroMedicoLaPaz;
go
-- Tabla Pacientes

CREATE TABLE Pacientes (
  ID INT IDENTITY(1,1) NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  Apellidos VARCHAR(100) NOT NULL,
  Direccion VARCHAR(255) NOT NULL,
  Telefono VARCHAR(15) NOT NULL,
  FechaNacimiento DATE NOT NULL,
  SeguroMedico VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID)
);

-- Tabla Habitaciones

CREATE TABLE Habitaciones (
  ID INT IDENTITY(1,1) NOT NULL,
  Tipo VARCHAR(20) NOT NULL,
  Estado VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

-- Tabla Quirófanos

CREATE TABLE Quirofanos (
  ID INT IDENTITY(1,1) NOT NULL,
  Numero VARCHAR(20) NOT NULL,
  Estado VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

-- Tabla Médicos

CREATE TABLE Medicos (
  ID INT IDENTITY(1,1) NOT NULL,
  Nombre VARCHAR(100) NOT NULL,
  NumeroLicencia VARCHAR(100) NOT NULL,
  Especialidad VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID)
);

-- Tabla Consultas

CREATE TABLE Consultas (
  ID INT IDENTITY(1,1) NOT NULL,
  ID_Paciente INT NOT NULL,
  ID_Medico INT NOT NULL,
  Fecha DATE NOT NULL,
  Hora TIME NOT NULL,
  Motivo VARCHAR(255) NOT NULL,
  Honorarios DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Paciente) REFERENCES Pacientes(ID),
  FOREIGN KEY (ID_Medico) REFERENCES Medicos(ID)
);

-- Tabla Hospitalizaciones

CREATE TABLE Hospitalizaciones (
  ID INT IDENTITY(1,1) NOT NULL,
  ID_Paciente INT NOT NULL,
  ID_Medico INT NOT NULL,
  FechaIngreso DATE NOT NULL,
  FechaAlta DATE,
  Categoria VARCHAR(20) NOT NULL,
  Honorarios DECIMAL(10,2) NOT NULL,
  ID_Habitacion INT NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Paciente) REFERENCES Pacientes(ID),
  FOREIGN KEY (ID_Medico) REFERENCES Medicos(ID),
  FOREIGN KEY (ID_Habitacion) REFERENCES Habitaciones(ID),
);

-- Tabla Atenciones

CREATE TABLE Atenciones (
  ID INT IDENTITY(1,1) NOT NULL,
  ID_Paciente INT NOT NULL,
  ID_Hospitalizacion INT NOT NULL,
  ID_Medico INT NOT NULL,
  Fecha DATE NOT NULL,
  Tipo VARCHAR(50) NOT NULL,
  Detalles VARCHAR(255),
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Paciente) REFERENCES Pacientes(ID),
  FOREIGN KEY (ID_Hospitalizacion) REFERENCES Hospitalizaciones(ID),
  FOREIGN KEY (ID_Medico) REFERENCES Medicos(ID)
);

-- Tabla Cirugias

CREATE TABLE Cirugias (
  ID INT IDENTITY(1,1) NOT NULL,
  ID_Paciente INT NOT NULL,
  ID_Medico INT NOT NULL,
  Fecha DATE NOT NULL,
  Hora TIME NOT NULL,
  Tipo VARCHAR(50) NOT NULL,
  PersonalMedico VARCHAR(255),
  Medicamentos VARCHAR(255),
  Materiales VARCHAR(255),
  ID_Quirofano INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID_Paciente) REFERENCES Pacientes(ID),
  FOREIGN KEY (ID_Medico) REFERENCES Medicos(ID),
  FOREIGN KEY (ID_Quirofano) REFERENCES Quirofanos(ID)
);

GO

-- Insersión de Paciente

CREATE PROCEDURE InsertarPaciente(
  @Nombre VARCHAR(100),
  @Apellidos VARCHAR(100),
  @Direccion VARCHAR(255),
  @Telefono VARCHAR(15),
  @FechaNacimiento DATE,
  @SeguroMedico VARCHAR(100)
)
AS
BEGIN
  -- Validación de datos
  IF @Nombre IS NULL OR @Nombre = ''
  BEGIN
    RAISERROR('El nombre es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Apellidos IS NULL OR @Apellidos = ''
  BEGIN
    RAISERROR('Los apellidos son obligatorios.', 16, 1);
    RETURN;
  END;

  INSERT INTO Pacientes(Nombre, Apellidos, Direccion, Telefono, FechaNacimiento, SeguroMedico)
  VALUES (@Nombre, @Apellidos, @Direccion, @Telefono, @FechaNacimiento, @SeguroMedico);
END;
GO

-- Inserción de Habitación
CREATE PROCEDURE InsertarHabitacion(
  @Tipo VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validación de datos
  IF @Tipo NOT IN ('semiprivada', 'privada', 'suite')
  BEGIN
    RAISERROR('El tipo de habitación debe ser uno de los siguientes: semiprivada, privada, suite.', 16, 1);
    RETURN;
  END;

  -- Inserción de datos
  INSERT INTO Habitaciones(Tipo, Estado)
  VALUES (@Tipo, @Estado);

END;
go

-- Inserción de Consulta

CREATE PROCEDURE InsertarConsulta(
  @ID_Paciente INT,
  @ID_Medico INT,
  @Fecha DATE,
  @Hora TIME,
  @Motivo VARCHAR(255),
  @Honorarios DECIMAL(10,2)
)
AS
BEGIN
  -- Validación de datos
  IF @ID_Paciente IS NULL
  BEGIN
    RAISERROR('El ID del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Medico IS NULL
  BEGIN
    RAISERROR('El ID del médico es obligatorio.', 16, 1);
    RETURN;
  END;


  -- Inserción de datos
  INSERT INTO Consultas(ID_Paciente, ID_Medico, Fecha, Hora, Motivo, Honorarios)
  VALUES (@ID_Paciente, @ID_Medico, @Fecha, @Hora, @Motivo, @Honorarios);

END;
GO

-- Inserción de Médico

CREATE PROCEDURE InsertarMedico(
  @Nombre VARCHAR(100),
  @NumeroLicencia VARCHAR(100),
  @Especialidad VARCHAR(100)
)
AS
BEGIN
  -- Validación de datos
  IF @Nombre IS NULL
  BEGIN
    RAISERROR('El nombre es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserción de datos
  INSERT INTO Medicos(Nombre, NumeroLicencia, Especialidad)
  VALUES (@Nombre, @NumeroLicencia, @Especialidad);

END;
GO

-- Inserción de Hospitalización

CREATE PROCEDURE InsertarHospitalizacion(
  @Nombre VARCHAR(100),
  @NumeroLicencia VARCHAR(100),
  @Especialidad VARCHAR(100)
)
AS
BEGIN
  -- Validación de datos
  IF @Nombre IS NULL
  BEGIN
    RAISERROR('El nombre es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserción de datos
  INSERT INTO Medicos(Nombre, NumeroLicencia, Especialidad)
  VALUES (@Nombre, @NumeroLicencia, @Especialidad);

END;
GO

-- Inserción de Atención

CREATE PROCEDURE InsertarAtencion(
  @ID_Paciente INT,
  @ID_Hospitalizacion INT,
  @ID_Medico INT,
  @Fecha DATE,
  @Tipo VARCHAR(50),
  @Detalles VARCHAR(255)
)
AS
BEGIN
  -- Validación de datos
  IF @Fecha < GETDATE()
  BEGIN
    RAISERROR('La fecha debe ser posterior o igual a la fecha actual.', 16, 1);
    RETURN;
  END;

  -- Inserción de datos
  INSERT INTO Atenciones(ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles)
  VALUES (@ID_Paciente, @ID_Hospitalizacion, @ID_Medico, @Fecha, @Tipo, @Detalles);

END;
GO

-- Insereción de Cirugía

CREATE PROCEDURE InsertarCirugia(
  @ID_Paciente INT,
  @ID_Medico INT,
  @Fecha DATE,
  @Hora TIME,
  @Tipo VARCHAR(50),
  @PersonalMedico VARCHAR(255),
  @Medicamentos VARCHAR(255),
  @Materiales VARCHAR(255),
  @ID_Quirofano INT
)
AS
BEGIN
  -- Validación de datos
  IF @ID_Paciente IS NULL
  BEGIN
    RAISERROR('El ID del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Medico IS NULL
  BEGIN
    RAISERROR('El ID del médico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Quirofano IS NULL
  BEGIN
    RAISERROR('El ID del quirófano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserción de datos
  INSERT INTO Cirugias(ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano)
  VALUES (@ID_Paciente, @ID_Medico, @Fecha, @Hora, @Tipo, @PersonalMedico, @Medicamentos, @Materiales, @ID_Quirofano);


END;
GO

-- Inserción de Quirófano

CREATE PROCEDURE InsertarQuirofano(
  @Numero VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validación de datos
  IF @Numero IS NULL OR @Numero = ''
  BEGIN
    RAISERROR('El número del quirófano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserción del quirófano
  INSERT INTO Quirofanos(Numero, Estado)
  VALUES (@Numero, @Estado);
END;
GO

-- Eliminación de Quirófano

CREATE PROCEDURE EliminarQuirofano(@Numero VARCHAR(20))
AS
BEGIN
  -- Validación de datos
  IF @Numero IS NULL OR @Numero = ''
  BEGIN
    RAISERROR('El número del quirófano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el quirófano exista
  SELECT *
  FROM Quirofanos
  WHERE Numero = @Numero;

  -- Si el quirófano no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El quirófano no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación del quirófano
  DELETE FROM Quirofanos
  WHERE Numero = @Numero;

END;
GO

-- Eliminación de Habitación

CREATE PROCEDURE EliminarHabitacion(@ID INT)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la habitación es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la habitación exista
  SELECT *
  FROM Habitaciones
  WHERE ID = @ID;

  -- Si la habitación no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La habitación no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación de la habitación
  DELETE FROM Habitaciones
  WHERE ID = @ID;

END;
GO

-- Eliminación de Consulta

CREATE PROCEDURE EliminarConsulta(@ID INT)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la consulta es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la consulta exista
  SELECT *
  FROM Consultas
  WHERE ID = @ID;

  -- Si la consulta no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La consulta no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación de la consulta
  DELETE FROM Consultas
  WHERE ID = @ID;

END;
GO

-- Eliminación de Médico

CREATE PROCEDURE EliminarMedico(@ID INT)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del médico es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el médico exista
  SELECT *
  FROM Medicos
  WHERE ID = @ID;

  -- Si el médico no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El médico no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación del médico
  DELETE FROM Medicos
  WHERE ID = @ID;
END;
GO

-- Eliminación de Hospitalización
CREATE PROCEDURE EliminarHospitalizacion(@ID INT)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la hospitalización es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la hospitalización exista
  SELECT *
  FROM Hospitalizaciones
  WHERE ID = @ID;

  -- Si la hospitalización no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La hospitalización no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación de la hospitalización
  DELETE FROM Hospitalizaciones
  WHERE ID = @ID;

END;
GO

-- Eliminación de Paciente

CREATE PROCEDURE EliminarPaciente(@ID INT)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el paciente exista
  SELECT *
  FROM Pacientes
  WHERE ID = @ID;

  -- Si el paciente no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El paciente no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación del paciente
  DELETE FROM Pacientes
  WHERE ID = @ID;
END;
GO

-- Eliminación de Cirugía

CREATE PROCEDURE EliminarCirugia(@ID INT)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la cirugía es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la cirugía exista
  SELECT *
  FROM Cirugias
  WHERE ID = @ID;

  -- Si la cirugía no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La cirugía no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación de la cirugía
  DELETE FROM Cirugias
  WHERE ID = @ID;
END;
GO

-- Eliminación de Atenciones

-- EliminarAtenciones
CREATE PROCEDURE EliminarAtenciones(@ID INT)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la atención es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la atención exista
  SELECT *
  FROM Atenciones
  WHERE ID = @ID;

  -- Si la atención no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La atención no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminación de la atención
  DELETE FROM Atenciones
  WHERE ID = @ID;
END;
GO

-- Actualización de Paciente

CREATE PROCEDURE ActualizarPaciente(
  @ID INT,
  @Nombre VARCHAR(100),
  @Apellidos VARCHAR(100),
  @Direccion VARCHAR(255),
  @Telefono VARCHAR(15),
  @FechaNacimiento DATE,
  @SeguroMedico VARCHAR(100)
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Nombre IS NULL
  BEGIN
    RAISERROR('El nombre del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Apellidos IS NULL
  BEGIN
    RAISERROR('Los apellidos del paciente son obligatorios.', 16, 1);
    RETURN;
  END;

  IF @Direccion IS NULL
  BEGIN
    RAISERROR('La dirección del paciente es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Telefono IS NULL
  BEGIN
    RAISERROR('El teléfono del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @FechaNacimiento IS NULL
  BEGIN
    RAISERROR('La fecha de nacimiento del paciente es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @SeguroMedico IS NULL
  BEGIN
    RAISERROR('El seguro médico del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el paciente exista
  SELECT *
  FROM Pacientes
  WHERE ID = @ID;

  -- Si el paciente no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El paciente no existe.', 16, 1);
    RETURN;
  END;

  -- Actualización del paciente
  UPDATE Pacientes
  SET Nombre = @Nombre,
    Apellidos = @Apellidos,
    Direccion = @Direccion,
    Telefono = @Telefono,
    FechaNacimiento = @FechaNacimiento,
    SeguroMedico = @SeguroMedico
  WHERE ID = @ID;
END;
GO

-- Actualización de Quirófano

CREATE PROCEDURE ActualizarQuirofano(
  @ID INT,
  @Numero VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del quirófano es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Numero IS NULL
  BEGIN
    RAISERROR('El número del quirófano es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Estado IS NULL
  BEGIN
    RAISERROR('El estado del quirófano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el quirófano exista
  SELECT *
  FROM Quirofanos
  WHERE ID = @ID;

  -- Si el quirófano no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El quirófano no existe.', 16, 1);
    RETURN;
  END;

  -- Actualización del quirófano
  UPDATE Quirofanos
  SET Numero = @Numero,
    Estado = @Estado
  WHERE ID = @ID;
END;
GO

-- Actualización de Médico

CREATE PROCEDURE ActualizarMedico(
  @ID INT,
  @Nombre VARCHAR(100),
  @NumeroLicencia VARCHAR(100),
  @Especialidad VARCHAR(100)
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del médico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Nombre IS NULL
  BEGIN
    RAISERROR('El nombre del médico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @NumeroLicencia IS NULL
  BEGIN
    RAISERROR('El número de licencia del médico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Especialidad IS NULL
  BEGIN
    RAISERROR('La especialidad del médico es obligatoria.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el médico exista
  SELECT *
  FROM Medicos
  WHERE ID = @ID;

  -- Si el médico no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El médico no existe.', 16, 1);
    RETURN;
  END;

  -- Actualización del médico
  UPDATE Medicos
  SET Nombre = @Nombre,
    NumeroLicencia = @NumeroLicencia,
    Especialidad = @Especialidad
  WHERE ID = @ID;
END;
GO

-- Actualización de Consulta

CREATE PROCEDURE ActualizarConsulta(
  @ID INT,
  @Fecha DATE,
  @Hora TIME,
  @ID_Paciente INT,
  @ID_Medico INT,
  @Motivo VARCHAR(255)
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la consulta es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Fecha IS NULL
  BEGIN
    RAISERROR('La fecha de la consulta es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Hora IS NULL
  BEGIN
    RAISERROR('La hora de la consulta es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @ID_Paciente IS NULL
  BEGIN
    RAISERROR('El ID del paciente de la consulta es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Medico IS NULL
  BEGIN
    RAISERROR('El ID del médico de la consulta es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la consulta exista
  SELECT *
  FROM Consultas
  WHERE ID = @ID;

  -- Si la consulta no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La consulta no existe.', 16, 1);
    RETURN;
  END;

  -- Actualización de la consulta
  UPDATE Consultas
  SET Fecha = @Fecha,
    Hora = @Hora,
    ID_Paciente = @ID_Paciente,
    ID_Medico = @ID_Medico,
    Motivo = @Motivo
  WHERE ID = @ID;
END;
GO

-- Actualización de Hospitalización

CREATE PROCEDURE ActualizarHospitalizacion(
  @ID INT,
  @FechaIngreso DATE,
  @FechaAlta DATE,
  @Categoria VARCHAR(20),
  @Honorarios DECIMAL(10,2),
  @ID_Paciente INT,
  @ID_Medico INT,
  @ID_Habitacion INT
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la hospitalización es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @FechaIngreso IS NULL
  BEGIN
    RAISERROR('La fecha de ingreso de la hospitalización es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @FechaAlta IS NULL
  BEGIN
    RAISERROR('La fecha de alta de la hospitalización es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Categoria IS NULL
  BEGIN
    RAISERROR('La categoría de la hospitalización es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Honorarios IS NULL
  BEGIN
    RAISERROR('Los honorarios de la hospitalización son obligatorios.', 16, 1);
    RETURN;
  END;

  IF @ID_Paciente IS NULL
  BEGIN
    RAISERROR('El ID del paciente de la hospitalización es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Medico IS NULL
  BEGIN
    RAISERROR('El ID del médico de la hospitalización es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Habitacion IS NULL
  BEGIN
    RAISERROR('El ID de la habitación de la hospitalización es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la hospitalización exista
  SELECT *
  FROM Hospitalizaciones
  WHERE ID = @ID;

  -- Si la hospitalización no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La hospitalización no existe.', 16, 1);
    RETURN;
  END;

  -- Actualización de la hospitalización
  UPDATE Hospitalizaciones
  SET FechaIngreso = @FechaIngreso,
    FechaAlta = @FechaAlta,
    Categoria = @Categoria,
    Honorarios = @Honorarios,
    ID_Paciente = @ID_Paciente,
    ID_Medico = @ID_Medico,
    ID_Habitacion = @ID_Habitacion
  WHERE ID = @ID;
END;
GO

-- Actualización de Atenciones

CREATE PROCEDURE ActualizarAtencion(
  @ID INT,
  @Fecha DATE,
  @Tipo VARCHAR(50),
  @Detalles VARCHAR(255)
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la atención es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Fecha IS NULL
  BEGIN
    RAISERROR('La fecha de la atención es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Tipo IS NULL
  BEGIN
    RAISERROR('El tipo de la atención es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la atención exista
  SELECT *
  FROM Atenciones
  WHERE ID = @ID;

  -- Si la atención no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La atención no existe.', 16, 1);
    RETURN;
  END;

  -- Actualización de la atención
  UPDATE Atenciones
  SET Fecha = @Fecha,
    Tipo = @Tipo,
    Detalles = @Detalles
  WHERE ID = @ID;
END;
GO

-- Actualización de Cirugías

CREATE PROCEDURE ActualizarCirugia(
  @ID INT,
  @Fecha DATE,
  @Hora TIME,
  @Tipo VARCHAR(50),
  @PersonalMedico VARCHAR(255),
  @Medicamentos VARCHAR(255),
  @Materiales VARCHAR(255),
  @ID_Quirofano INT
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la cirugía es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Fecha IS NULL
  BEGIN
    RAISERROR('La fecha de la cirugía es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Hora IS NULL
  BEGIN
    RAISERROR('La hora de la cirugía es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Tipo IS NULL
  BEGIN
    RAISERROR('El tipo de la cirugía es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la cirugía exista
  SELECT *
  FROM Cirugías
  WHERE ID = @ID;

  -- Si la cirugía no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La cirugía no existe.', 16, 1);
    RETURN;
  END;

  -- Actualización de la cirugía
  UPDATE Cirugias
  SET Fecha = @Fecha,
    Hora = @Hora,
    Tipo = @Tipo,
    PersonalMedico = @PersonalMedico,
    Medicamentos = @Medicamentos,
    Materiales = @Materiales,
    ID_Quirofano = @ID_Quirofano
  WHERE ID = @ID;
END;
GO

-- Actualización de Habitación

CREATE PROCEDURE ActualizarHabitacion(
  @ID INT,
  @Tipo VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validación de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la habitación es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Tipo IS NULL
  BEGIN
    RAISERROR('El tipo de la habitación es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Estado IS NULL
  BEGIN
    RAISERROR('El estado de la habitación es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la habitación exista
  SELECT *
  FROM Habitaciones
  WHERE ID = @ID;

  -- Si la habitación no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La habitación no existe.', 16, 1);
    RETURN;
  END;

  -- Validación del estado
  IF @Estado NOT IN ('Ocupada', 'Libre')
  BEGIN
    RAISERROR('El estado de la habitación debe ser "Ocupada" o "Libre".', 16, 1);
    RETURN;
  END;

  -- Actualización de la habitación
  UPDATE Habitaciones
  SET Tipo = @Tipo,
    Estado = @Estado
  WHERE ID = @ID;
END;

GO