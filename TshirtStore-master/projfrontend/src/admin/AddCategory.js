import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {

const [name, setName] = useState("")
const [error, setError] = useState(false)
const [success, setSuccess] = useState(false)

const {user, token} =isAuthenticated();

const handleChange = (event) => {
setError("");
setName(event.target.value);

};

const onSubmit = (event) => {
event.preventDefault();
setError("");
setSuccess(false)

//backedn request 
createCategory(user._id, token, {name})
.then(data => {
    if(data && data.error){
        setError(true);
    }
    else{
        setError("");
        setName("");
        setSuccess(true);
    }
})
}

const successMessage = () => {
    if (success){
        return <h4 className="text-success">Category created successfully</h4>
    }
};

const warningMessage = () => {
    if (error){
        return <h4 className="text-success">Failed to create category</h4>
    }
};

const myCategoryForm = () => {
    return (<form>
        <div className="form-group">
            <h3>Enter the Category</h3>
            <input type="text" className="form-control my-3" 
            onChange = {handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
            />
            <button onClick={onSubmit} className="btn btn-success">Create Category</button>
        </div>
    </form>);

};

const goBack = () => {
    return (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )
}

return (
        <Base title="Create a new Category" description="Add a new category for new product"
        className = "container bg-success p-4"
        >
        <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {warningMessage()}
               {myCategoryForm()}
               {goBack()}
            </div>
        </div>

        </Base>
    )
}
export default AddCategory;
