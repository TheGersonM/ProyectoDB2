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

-- Tabla Quir�fanos

CREATE TABLE Quirofanos (
  ID INT IDENTITY(1,1) NOT NULL,
  Numero VARCHAR(20) NOT NULL,
  Estado VARCHAR(20) NOT NULL,
  PRIMARY KEY (ID)
);

-- Tabla M�dicos

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

-- Insersi�n de Paciente

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
  -- Validaci�n de datos
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

-- Inserci�n de Habitaci�n
CREATE PROCEDURE InsertarHabitacion(
  @Tipo VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @Tipo NOT IN ('semiprivada', 'privada', 'suite')
  BEGIN
    RAISERROR('El tipo de habitaci�n debe ser uno de los siguientes: semiprivada, privada, suite.', 16, 1);
    RETURN;
  END;

  -- Inserci�n de datos
  INSERT INTO Habitaciones(Tipo, Estado)
  VALUES (@Tipo, @Estado);

END;
go

-- Inserci�n de Consulta

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
  -- Validaci�n de datos
  IF @ID_Paciente IS NULL
  BEGIN
    RAISERROR('El ID del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Medico IS NULL
  BEGIN
    RAISERROR('El ID del m�dico es obligatorio.', 16, 1);
    RETURN;
  END;


  -- Inserci�n de datos
  INSERT INTO Consultas(ID_Paciente, ID_Medico, Fecha, Hora, Motivo, Honorarios)
  VALUES (@ID_Paciente, @ID_Medico, @Fecha, @Hora, @Motivo, @Honorarios);

END;
GO

-- Inserci�n de M�dico

CREATE PROCEDURE InsertarMedico(
  @Nombre VARCHAR(100),
  @NumeroLicencia VARCHAR(100),
  @Especialidad VARCHAR(100)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @Nombre IS NULL
  BEGIN
    RAISERROR('El nombre es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserci�n de datos
  INSERT INTO Medicos(Nombre, NumeroLicencia, Especialidad)
  VALUES (@Nombre, @NumeroLicencia, @Especialidad);

END;
GO

-- Inserci�n de Hospitalizaci�n

CREATE PROCEDURE InsertarHospitalizacion(
  @Nombre VARCHAR(100),
  @NumeroLicencia VARCHAR(100),
  @Especialidad VARCHAR(100)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @Nombre IS NULL
  BEGIN
    RAISERROR('El nombre es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserci�n de datos
  INSERT INTO Medicos(Nombre, NumeroLicencia, Especialidad)
  VALUES (@Nombre, @NumeroLicencia, @Especialidad);

END;
GO

-- Inserci�n de Atenci�n

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
  -- Validaci�n de datos
  IF @Fecha < GETDATE()
  BEGIN
    RAISERROR('La fecha debe ser posterior o igual a la fecha actual.', 16, 1);
    RETURN;
  END;

  -- Inserci�n de datos
  INSERT INTO Atenciones(ID_Paciente, ID_Hospitalizacion, ID_Medico, Fecha, Tipo, Detalles)
  VALUES (@ID_Paciente, @ID_Hospitalizacion, @ID_Medico, @Fecha, @Tipo, @Detalles);

END;
GO

-- Insereci�n de Cirug�a

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
  -- Validaci�n de datos
  IF @ID_Paciente IS NULL
  BEGIN
    RAISERROR('El ID del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Medico IS NULL
  BEGIN
    RAISERROR('El ID del m�dico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Quirofano IS NULL
  BEGIN
    RAISERROR('El ID del quir�fano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserci�n de datos
  INSERT INTO Cirugias(ID_Paciente, ID_Medico, Fecha, Hora, Tipo, PersonalMedico, Medicamentos, Materiales, ID_Quirofano)
  VALUES (@ID_Paciente, @ID_Medico, @Fecha, @Hora, @Tipo, @PersonalMedico, @Medicamentos, @Materiales, @ID_Quirofano);


END;
GO

-- Inserci�n de Quir�fano

CREATE PROCEDURE InsertarQuirofano(
  @Numero VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @Numero IS NULL OR @Numero = ''
  BEGIN
    RAISERROR('El n�mero del quir�fano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Inserci�n del quir�fano
  INSERT INTO Quirofanos(Numero, Estado)
  VALUES (@Numero, @Estado);
END;
GO

-- Eliminaci�n de Quir�fano

CREATE PROCEDURE EliminarQuirofano(@Numero VARCHAR(20))
AS
BEGIN
  -- Validaci�n de datos
  IF @Numero IS NULL OR @Numero = ''
  BEGIN
    RAISERROR('El n�mero del quir�fano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el quir�fano exista
  SELECT *
  FROM Quirofanos
  WHERE Numero = @Numero;

  -- Si el quir�fano no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El quir�fano no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminaci�n del quir�fano
  DELETE FROM Quirofanos
  WHERE Numero = @Numero;

END;
GO

-- Eliminaci�n de Habitaci�n

CREATE PROCEDURE EliminarHabitacion(@ID INT)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la habitaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la habitaci�n exista
  SELECT *
  FROM Habitaciones
  WHERE ID = @ID;

  -- Si la habitaci�n no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La habitaci�n no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminaci�n de la habitaci�n
  DELETE FROM Habitaciones
  WHERE ID = @ID;

END;
GO

-- Eliminaci�n de Consulta

CREATE PROCEDURE EliminarConsulta(@ID INT)
AS
BEGIN
  -- Validaci�n de datos
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

  -- Eliminaci�n de la consulta
  DELETE FROM Consultas
  WHERE ID = @ID;

END;
GO

-- Eliminaci�n de M�dico

CREATE PROCEDURE EliminarMedico(@ID INT)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del m�dico es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el m�dico exista
  SELECT *
  FROM Medicos
  WHERE ID = @ID;

  -- Si el m�dico no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El m�dico no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminaci�n del m�dico
  DELETE FROM Medicos
  WHERE ID = @ID;
END;
GO

-- Eliminaci�n de Hospitalizaci�n
CREATE PROCEDURE EliminarHospitalizacion(@ID INT)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la hospitalizaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la hospitalizaci�n exista
  SELECT *
  FROM Hospitalizaciones
  WHERE ID = @ID;

  -- Si la hospitalizaci�n no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La hospitalizaci�n no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminaci�n de la hospitalizaci�n
  DELETE FROM Hospitalizaciones
  WHERE ID = @ID;

END;
GO

-- Eliminaci�n de Paciente

CREATE PROCEDURE EliminarPaciente(@ID INT)
AS
BEGIN
  -- Validaci�n de datos
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

  -- Eliminaci�n del paciente
  DELETE FROM Pacientes
  WHERE ID = @ID;
END;
GO

-- Eliminaci�n de Cirug�a

CREATE PROCEDURE EliminarCirugia(@ID INT)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la cirug�a es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la cirug�a exista
  SELECT *
  FROM Cirugias
  WHERE ID = @ID;

  -- Si la cirug�a no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La cirug�a no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminaci�n de la cirug�a
  DELETE FROM Cirugias
  WHERE ID = @ID;
END;
GO

-- Eliminaci�n de Atenciones

-- EliminarAtenciones
CREATE PROCEDURE EliminarAtenciones(@ID INT)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la atenci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la atenci�n exista
  SELECT *
  FROM Atenciones
  WHERE ID = @ID;

  -- Si la atenci�n no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La atenci�n no existe.', 16, 1);
    RETURN;
  END;

  -- Eliminaci�n de la atenci�n
  DELETE FROM Atenciones
  WHERE ID = @ID;
END;
GO

-- Actualizaci�n de Paciente

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
  -- Validaci�n de datos
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
    RAISERROR('La direcci�n del paciente es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Telefono IS NULL
  BEGIN
    RAISERROR('El tel�fono del paciente es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @FechaNacimiento IS NULL
  BEGIN
    RAISERROR('La fecha de nacimiento del paciente es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @SeguroMedico IS NULL
  BEGIN
    RAISERROR('El seguro m�dico del paciente es obligatorio.', 16, 1);
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

  -- Actualizaci�n del paciente
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

-- Actualizaci�n de Quir�fano

CREATE PROCEDURE ActualizarQuirofano(
  @ID INT,
  @Numero VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del quir�fano es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Numero IS NULL
  BEGIN
    RAISERROR('El n�mero del quir�fano es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Estado IS NULL
  BEGIN
    RAISERROR('El estado del quir�fano es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el quir�fano exista
  SELECT *
  FROM Quirofanos
  WHERE ID = @ID;

  -- Si el quir�fano no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El quir�fano no existe.', 16, 1);
    RETURN;
  END;

  -- Actualizaci�n del quir�fano
  UPDATE Quirofanos
  SET Numero = @Numero,
    Estado = @Estado
  WHERE ID = @ID;
END;
GO

-- Actualizaci�n de M�dico

CREATE PROCEDURE ActualizarMedico(
  @ID INT,
  @Nombre VARCHAR(100),
  @NumeroLicencia VARCHAR(100),
  @Especialidad VARCHAR(100)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID del m�dico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Nombre IS NULL
  BEGIN
    RAISERROR('El nombre del m�dico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @NumeroLicencia IS NULL
  BEGIN
    RAISERROR('El n�mero de licencia del m�dico es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Especialidad IS NULL
  BEGIN
    RAISERROR('La especialidad del m�dico es obligatoria.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que el m�dico exista
  SELECT *
  FROM Medicos
  WHERE ID = @ID;

  -- Si el m�dico no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('El m�dico no existe.', 16, 1);
    RETURN;
  END;

  -- Actualizaci�n del m�dico
  UPDATE Medicos
  SET Nombre = @Nombre,
    NumeroLicencia = @NumeroLicencia,
    Especialidad = @Especialidad
  WHERE ID = @ID;
END;
GO

-- Actualizaci�n de Consulta

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
  -- Validaci�n de datos
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
    RAISERROR('El ID del m�dico de la consulta es obligatorio.', 16, 1);
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

  -- Actualizaci�n de la consulta
  UPDATE Consultas
  SET Fecha = @Fecha,
    Hora = @Hora,
    ID_Paciente = @ID_Paciente,
    ID_Medico = @ID_Medico,
    Motivo = @Motivo
  WHERE ID = @ID;
END;
GO

-- Actualizaci�n de Hospitalizaci�n

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
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la hospitalizaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @FechaIngreso IS NULL
  BEGIN
    RAISERROR('La fecha de ingreso de la hospitalizaci�n es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @FechaAlta IS NULL
  BEGIN
    RAISERROR('La fecha de alta de la hospitalizaci�n es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Categoria IS NULL
  BEGIN
    RAISERROR('La categor�a de la hospitalizaci�n es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Honorarios IS NULL
  BEGIN
    RAISERROR('Los honorarios de la hospitalizaci�n son obligatorios.', 16, 1);
    RETURN;
  END;

  IF @ID_Paciente IS NULL
  BEGIN
    RAISERROR('El ID del paciente de la hospitalizaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Medico IS NULL
  BEGIN
    RAISERROR('El ID del m�dico de la hospitalizaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @ID_Habitacion IS NULL
  BEGIN
    RAISERROR('El ID de la habitaci�n de la hospitalizaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la hospitalizaci�n exista
  SELECT *
  FROM Hospitalizaciones
  WHERE ID = @ID;

  -- Si la hospitalizaci�n no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La hospitalizaci�n no existe.', 16, 1);
    RETURN;
  END;

  -- Actualizaci�n de la hospitalizaci�n
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

-- Actualizaci�n de Atenciones

CREATE PROCEDURE ActualizarAtencion(
  @ID INT,
  @Fecha DATE,
  @Tipo VARCHAR(50),
  @Detalles VARCHAR(255)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la atenci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Fecha IS NULL
  BEGIN
    RAISERROR('La fecha de la atenci�n es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Tipo IS NULL
  BEGIN
    RAISERROR('El tipo de la atenci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la atenci�n exista
  SELECT *
  FROM Atenciones
  WHERE ID = @ID;

  -- Si la atenci�n no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La atenci�n no existe.', 16, 1);
    RETURN;
  END;

  -- Actualizaci�n de la atenci�n
  UPDATE Atenciones
  SET Fecha = @Fecha,
    Tipo = @Tipo,
    Detalles = @Detalles
  WHERE ID = @ID;
END;
GO

-- Actualizaci�n de Cirug�as

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
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la cirug�a es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Fecha IS NULL
  BEGIN
    RAISERROR('La fecha de la cirug�a es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Hora IS NULL
  BEGIN
    RAISERROR('La hora de la cirug�a es obligatoria.', 16, 1);
    RETURN;
  END;

  IF @Tipo IS NULL
  BEGIN
    RAISERROR('El tipo de la cirug�a es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la cirug�a exista
  SELECT *
  FROM Cirug�as
  WHERE ID = @ID;

  -- Si la cirug�a no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La cirug�a no existe.', 16, 1);
    RETURN;
  END;

  -- Actualizaci�n de la cirug�a
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

-- Actualizaci�n de Habitaci�n

CREATE PROCEDURE ActualizarHabitacion(
  @ID INT,
  @Tipo VARCHAR(20),
  @Estado VARCHAR(20)
)
AS
BEGIN
  -- Validaci�n de datos
  IF @ID IS NULL
  BEGIN
    RAISERROR('El ID de la habitaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Tipo IS NULL
  BEGIN
    RAISERROR('El tipo de la habitaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  IF @Estado IS NULL
  BEGIN
    RAISERROR('El estado de la habitaci�n es obligatorio.', 16, 1);
    RETURN;
  END;

  -- Consulta para verificar que la habitaci�n exista
  SELECT *
  FROM Habitaciones
  WHERE ID = @ID;

  -- Si la habitaci�n no existe, lanzamos un error
  IF @@ROWCOUNT = 0
  BEGIN
    RAISERROR('La habitaci�n no existe.', 16, 1);
    RETURN;
  END;

  -- Validaci�n del estado
  IF @Estado NOT IN ('Ocupada', 'Libre')
  BEGIN
    RAISERROR('El estado de la habitaci�n debe ser "Ocupada" o "Libre".', 16, 1);
    RETURN;
  END;

  -- Actualizaci�n de la habitaci�n
  UPDATE Habitaciones
  SET Tipo = @Tipo,
    Estado = @Estado
  WHERE ID = @ID;
END;

GO