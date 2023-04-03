// client.ts
import sanityClient, { createClient } from '@sanity/client'

export default createClient({
    projectId: 'h1m7ql2u', // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: "2023-04-03"
})