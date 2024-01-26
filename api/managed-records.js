import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records"
// let apiPath = "http://localhost:3000/recordszzz"

// Your retrieve function plus any additional functions go here ...

const primaryColors = ['red', 'blue', 'yellow']
const retrieve = async ({ page = 1, colors = [] } = {}) => {
    const limit = 10

    try {
        const url = URI(window.path).search({
            // const url = URI(apiPath).search({
            offset: (page - 1) * limit,
            limit,
            color: colors.length === 1 ? [...colors, ''] : colors
        })

        // console.log({ url })

        const res = await fetch(url)
        const data = await res.json()

        // console.log({ data })

        return {
            ids: data.map(d => d.id) || [],
            open: data.filter(d => d.disposition === 'open').map(d => ({ ...d, isPrimary: primaryColors.includes(d.color) })) || [],
            closedPrimaryCount: data.filter(d => d.disposition === 'closed' && primaryColors.includes(d.color)).length,
            previousPage: page === 1 ? null : page - 1,
            nextPage: page === 50 ? null : data.length > 0 ? page + 1 : null
        }
    } catch (error) {
        console.log({ error })
        return null
    }
}

// const res = await retrieve()
// console.log({ res })


export default retrieve;
