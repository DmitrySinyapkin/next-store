import { AutoComplete, Input } from "antd"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getAllProducts } from "../api/fakeStoreApi"
import { ProductType } from "../types/apiResponses"
import { SearchOptionsType } from "../types/common"

const SearchProducts = () => {
    const [data, setData] = useState([])
    const [options, setOptions] = useState<Array<SearchOptionsType>>([])

    const router = useRouter()

    useEffect(() => {
        getAllProducts()
            .then(resp => setData(resp))
    }, [])

    const handleSelect = (value: number) => {
        router.push(`/products/${value}`)
        setOptions([])
    }

    const handleSearch = (quary: string) => {
        const filtered = data.filter((product: ProductType) => product.title.toLowerCase().includes(quary.toLowerCase()) || product.description.toLowerCase().includes(quary.toLowerCase()))
        if (filtered.length > 0) {
            setOptions(filtered.map((product: ProductType) => ({
                value: product.id,
                label: product.title.slice(0, 50) + '...'
            })))
        }
    }

    const handleClear = () => {
        setOptions([])
    }

    return (
        <>
            <AutoComplete
                style={{ width: 300 }}
                options={options}
                onSelect={handleSelect}
                onSearch={handleSearch}
                onClear={handleClear}
            >
                <Input.Search placeholder='Search products...' />
            </AutoComplete>
        </>
    )
}

export default SearchProducts
