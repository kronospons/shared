# shared
Utilidades centrales compartidas (ej. `PonsUtils`).

## Uso como dependencia (npm desde GitHub)
Ejemplo en `package.json`:

```json
{
  "dependencies": {
    "@utils/shared": "git+https://github.com/kronospons/shared.git"
  }
}
```

Luego instala:

```bash
npm install
```

## Si falla npm install (ERESOLVE o caché)
Ejecuta estos pasos en el proyecto que consume la librería:

```bash
npm cache clean --force
del package-lock.json
rmdir /s /q node_modules
npm install
```

## Importación en el código
Ejemplo de uso:

```ts
import { PonsUtils } from '@utils/shared';
```

> Nota: este repo expone solo `src/utils`.

