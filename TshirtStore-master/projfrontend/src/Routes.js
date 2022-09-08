import React from 'react'
import {BrowserRouter,Switch,Route } from "react-router-dom"
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageCategories from './admin/ManageCategories'
import ManageProducts from './admin/ManageProducts'
import UpdateThisProduct from './admin/UpdateProduct'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import Cart from './core/Cart'

import Home from "./core/Home"
import AdminDashboard from './user/AdminDashBoard'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashBoard'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path="/admin/create/category" exact component={AddCategory}></AdminRoute>
                <AdminRoute path="/admin/categories" exact component={ManageCategories}></AdminRoute>
                <AdminRoute path="/admin/create/product" exact component={AddProduct}></AdminRoute>
                <AdminRoute path="/admin/products" exact component={ManageProducts}></AdminRoute>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateThisProduct}></AdminRoute>

                <PrivateRoute path="/user/dashboard" exact component={UserDashboard}></PrivateRoute>

            </Switch>
        </BrowserRouter>
    )
}

export default Routes

