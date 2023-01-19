# Mecánicas

## Elegir enemigo
### BOTÓN: Crear Enemigo.
- Se crea un número aleatorio del 1 al 100.
- lv01=50%; lv02=20%; lv03=10%; lv04=5%: lv05=4%; lv06=1%
- Se comprueba que haya un enemigo de ese level en la lista de enemigos vivos.
    - SI/ Se mandan las propiedades a pantalla./Se marca enemigo en tablero.
    - NO/ Se busca un level inferior.
        - SI/ Se mandan las propiedades a pantalla./Se marca enemigo en tablero.
        - NO/ Se busca un level superior.
            -SI/ Se mandan las propiedades a pantalla./Se marca enemigo en tablero.
            -NO/ Se manda el jefe final a pantalla./Se marca enemigo en tablero.

### BOTÓN: Matar enemigo 
- Este botón solo esta activo si hay unas propiedades de un enemigo en pantalla
- Se elimina el enemigo poniendo un 0 en el lugar correspondiente del array.
- Se comprueba que no sea el enemigo final
    -SI/ Juego acabado, eliminar botones y crear botón reset.
    -NO/ Se marca como eliminado el enemigo en tablero y con un 0 en array.