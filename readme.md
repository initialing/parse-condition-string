
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
const condParse = require("parse-condition-string");
```

use

```javaScript
condParse("(a || b) && c", obj);
// false
```
