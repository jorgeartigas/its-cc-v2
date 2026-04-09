## Problemas detectados en el código base

El proyecto base no tenía una configuración de testing lista para trabajar con Jest. Faltaban dependencias y archivos de configuración necesarios para compilar y ejecutar los tests. Al instalar las herramientas surgió un conflicto de dependencias. Como se trataba de una demo, decidí actualizar la version de Angular para asegurar compatibilidad. En un proyecto real, este tipo de cambio se revisaría con más cautela para evitar introducir una actualización innecesaria del framework.

Los tests originales no validaban el comportamiento real que pedía el ejercicio. Algunos comprobaban simplemente que existían elementos escritos de forma estática en el HTML, y otros verificaban detalles internos de implementación que no representaban una funcionalidad observable desde el punto de vista de un usuario.

## Decisiones de diseño

La principal decisión de diseño fue separar la lógica de negocio de la interfaz. Para ello se creó una `TodoStore` como fuente de verdad de la aplicación. Esa store se encarga de mantener el estado de las tareas, el filtro activo, el listado visible y el contador de pendientes. También centraliza las acciones principales.

Con esta separación, el componente principal quedó como un contenedor. y la interfaz se dividió en componentes pequeños y con una responsabilidad clara:

- un componente para añadir tareas
- un componente para los filtros
- un componente para representar cada tarea

## Enfoque TDD: Red → Green → Refactor

El desarrollo se hizo siguiendo un ciclo TDD progresivo.

Primero, en la fase **Red**, se escribieron tests que describían los requisitos del ejercicio: añadir tareas, impedir títulos vacíos, marcar tareas como completadas, eliminarlas, filtrarlas por estado y ordenarlas por prioridad. En ese momento los tests fallaban porque la funcionalidad aún no existía.

Después, en la fase **Green**, se implementó la lógica mínima necesaria para que esos tests pasaran. En esta etapa no se buscó todavía la mejor arquitectura posible, sino una solución funcional y simple que cumpliera el comportamiento esperado.

Una vez en verde, se pasó a **Refactor**. Aquí se reorganizó el código sin cambiar el comportamiento: primero se movió la lógica a una store con `signals`, después se simplificó el componente principal y finalmente se separó la interfaz en componentes pequeños

Más adelante, los tests también se reorganizaron para que cada nivel probara lo que le corresponde:

- la store prueba la lógica de negocio
- los componentes hijos prueban su renderizado y sus eventos
- el componente contenedor prueba la integración entre formulario, vista y store

## Mejoras futuras

Como posibles mejoras, se podrían añadir comentarios breves en el código para dejar constancia de algunas ideas de evolución:

- mejora de la interfaz
- permitir edición de tareas existentes
- incorporar tests de accesibilidad más específicos
- persistir las tareas en almacenamiento local o cargarlas desde una API
