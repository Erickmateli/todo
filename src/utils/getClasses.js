//Helper function to change the styling of the button based on the variant given

export const getClasses = (classes) =>{
    return classes.filter(item => item !== '').join(' ').trim()
}