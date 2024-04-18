/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import * as React from 'react'
import { useState, useEffect } from 'react';

const ServerData = (props: any) => {

    const [SpData, setSpData] = useState([])


    useEffect(() => {
        getGamesData()

    }, [])
    console.log("SpData143", SpData);
    async function getGamesData() {
        const siteUrl = props.context.pageContext.web.absoluteUrl;
        const decodedListName = 'Manage%20Categories';
        const listName = decodeURIComponent(decodedListName);

        // Now you can use decodedListName in your SharePoint Framework code

        const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&`
        // const apiUrl = ${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID;

        try {
            const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

            if (response.ok) {
                const data = await response.json();
                console.log("service layer data:", data.value);
                setSpData(data.value)

                // Return the data
            } else {
                console.log(`Error: ${response.statusText}`);
                throw new Error(response.statusText); // Throw an error if the response is not ok
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Rethrow the error
        }

    }


    return (
        <>
        </>

    )
}

export default ServerData



