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




--Solucion en el CRUD del insert e Update para todos los formularios, se implemento primero en quirofanos

El problema se debe a que en tu lógica para el botón de guardar (en la ventana modal), el comportamiento depende de `seleccionQuirofano.size`. Sin embargo, el modal no está limpiando correctamente las variables del formulario al abrirse en modo de inserción.

Aquí está la solución paso a paso para manejar correctamente la distinción entre **Insert** y **Update**:

---

### 1. **Agregar una variable de estado para distinguir entre Insert y Update**
Define una variable en tu componente para controlar el modo actual del formulario.

```typescript
modoFormulario: 'insertar' | 'actualizar' = 'insertar';
```

---

### 2. **Configurar el modo al abrir el modal**
Cuando abras el modal para agregar un quirófano, asegúrate de configurar el formulario al modo "Insertar" y limpiar las variables relacionadas con los datos del formulario.

Actualiza tu botón **Agregar** para establecer el modo y limpiar el formulario:

```html
<button (click)="abrirModal('insertar')" type="button" data-toggle="modal" data-target="#medic" class="btn btn-default btn-sm">
    <i class="fas fa-plus"></i>
</button>
```

Cuando abras el modal para editar, configúralo como "Actualizar" y carga los datos del quirófano seleccionado:

```html
<button [disabled]="!seleccionQuirofano.size" (click)="abrirModal('actualizar')"
        [attr.data-toggle]="seleccionQuirofano.size == 1 ? 'modal': null"
        [attr.data-target]="seleccionQuirofano.size == 1 ? '#medic': null"
        class="btn btn-default btn-sm">
    <i class="fas fa-edit"></i>
</button>
```

---

### 3. **Método `abrirModal` en el componente**
Implementa un método en el componente para manejar la lógica de apertura del modal:

```typescript
abrirModal(modo: 'insertar' | 'actualizar') {
  this.modoFormulario = modo;

  if (modo === 'insertar') {
    // Limpiar el formulario
    this.Numero = '';
    this.Estado = 'libre';
  } else if (modo === 'actualizar') {
    // Cargar los datos del quirófano seleccionado
    const seleccionado = Array.from(this.seleccionQuirofano.values())[0];
    if (seleccionado) {
      this.Numero = seleccionado.Numero;
      this.Estado = seleccionado.Estado;
    }
  }
}
```

---

### 4. **Actualizar el botón Guardar en el modal**
En el modal, ajusta el botón para que ejecute la acción según el valor de `modoFormulario`:

```html
<button (click)="modoFormulario === 'actualizar' ? actualizarQuirofano() : insertarQuirofano()"
        type="button" class="btn btn-primary">
    Save changes
</button>
```

---

### 5. **Validar el flujo**
- Al abrir el modal para insertar:
  - La variable `modoFormulario` debe ser `'insertar'`.
  - El formulario debe estar limpio.
- Al abrir el modal para editar:
  - La variable `modoFormulario` debe ser `'actualizar'`.
  - El formulario debe estar lleno con los datos del quirófano seleccionado.

---

### 6. **Extras: Estilizar el modal según el modo**
Si quieres que el título del modal refleje el modo actual, puedes hacerlo dinámico:

```html
<h5 class="modal-title h4" id="exampleModalXlLabel">
    {{ modoFormulario === 'actualizar' ? 'Edición de Quirófano' : 'Creación de Quirófano' }}
</h5>
```

---

### Resumen
Este enfoque asegura que:
1. El modal se abra con el estado adecuado (insertar o actualizar).
2. El formulario se limpie correctamente cuando sea necesario.
3. El botón "Guardar" ejecute la acción adecuada según el modo actual.

Con esta solución, evitarás confusiones y podrás manejar tanto la creación como la edición de quirófanos de manera clara y efectiva.




lineas finales para solucion en el update en el componente, que selecciona el ID


 abrirModal(modo: 'insertar' | 'actualizar') {
    this.modoFormulario = modo;
  
    if (modo === 'insertar') {
      // Limpiar el formulario
      this.Numero = '';
      this.Estado = 'libre';
    } else if (modo === 'actualizar') {
      this.ID = this.obtenerQuirofano();             -------------------> // Obtener el ID del quirófano seleccionado
      // Cargar los datos del quirófano seleccionado
      const seleccionado = Array.from(this.seleccionQuirofano.values())[0];
      if (seleccionado) {
        this.Numero = seleccionado.Numero;
        this.Estado = seleccionado.Estado;
      }
    }
  }
  