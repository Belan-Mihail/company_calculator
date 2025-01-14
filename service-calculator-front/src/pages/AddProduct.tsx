import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

interface ProductFormData {
    productName: string,
    productPrice: number,
    productQuantityInStock: number,
    errorMessage: string
}

const AddProduct: React.FC = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<ProductFormData>({
        productName: '',
        productPrice: 0,
        productQuantityInStock: 0,
        errorMessage: '',
    })
    

  return (
    <div>AddProduct</div>
  )
}

export default AddProduct