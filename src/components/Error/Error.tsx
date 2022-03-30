import React from "react";

import "./Error.css"

export default function Error({code}) {
    return <div className={'error'}>
        Я ошибка : {code}
    </div>
}
