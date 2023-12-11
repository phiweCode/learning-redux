
const reminder = (dateObject) =>
{

    let currentDate = new Date().toLocaleDateString().split('/').join('-')
    let currentTime = new Date().toLocaleTimeString()

    if ( currentDate == dateObject.dueDate)
    {
        console.log(`${currentDate} and ${dateObject.dueDate}`)
        return true
    }

    console.log(`${currentDate} and ${dateObject.dueDate}`)
    return false

}

export default reminder
