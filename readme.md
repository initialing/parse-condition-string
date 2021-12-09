
# parse-condition-string

A package about parse condition string to js condition

## how to use

transfer the conditions string like `(a || b) && c`, the variables of the string
is the keys of the object like below

```javascript
let obj = {
    a: true,
    b: false,
    c: false
}
```

to real javaScript conditions.

import package

```javaScript
const condParse = require("parse-condition-string"); // commonjs
import condParse from "parse-condition-string"; // esmodule
import condParse from "parse-condition-string"; // typescript
```

use

```javaScript
condParse("(a || b) && c", obj);
// false
```
