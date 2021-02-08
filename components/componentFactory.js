module.exports.TextComponent = (props) => {
    return {
        component : 'ContentBlock',
        ...props
    }
}

module.exports.InputComponent = (props) => {
    return {
        component : 'InputComponent',
        ...props
    }
}