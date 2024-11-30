--modificacion de la tabla medicos

ALTER TABLE Medicos
ADD Activo BIT NOT NULL DEFAULT 1;
go

--Modificacion prodecimiento almacenado de eliminacion de medicos

USE [CentroMedicoLaPaz]
GO
/****** Object:  StoredProcedure [dbo].[EliminarMedico]    Script Date: 11/29/2024 10:51:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Actualización del estado del médico

ALTER PROCEDURE [dbo].[EliminarMedico](@ID INT)
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

  -- Actualización del estado del médico a 0 (inactivo)
  UPDATE Medicos
  SET Activo = 0
  WHERE ID = @ID;
END;


--Modificacion prodecimiento almacenado de vista Obtener Medicos

USE [CentroMedicoLaPaz]
GO

/****** Object:  View [dbo].[ObtenerMedicos]    Script Date: 11/29/2024 10:52:09 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[ObtenerMedicos] AS
SELECT * FROM Medicos WHERE Activo = 1;
GO


--(QUEDA PENDIENTE LA MODIFICACION DEL MODAL EN EL UPDATE DE MEDICOS EN SELECCIONAR LINEA QUE SELECCIONA UNA EN ESPECIFICO)