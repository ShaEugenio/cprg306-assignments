"use client";
import { useState } from "react";

export default function NewItem(){
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");
    const [itemCreated, setItemCreated] = useState(false);
    // const { onAddItem } = props;

    function handleSubmit(submit)
    {
        // Replace the alert functionality by calling the onAddItem prop with the item object when the form is submitted. The item object should have the following properties: name, quantity, and category.

        onAddItem({
            name,
            quantity,
            category
        });

        submit.preventDefault();

        const NewItem = {
            name,
            quantity,
            category
        };

        console.log(NewItem);

        setItemCreated(true);
        setName("");
        setQuantity(1);
        setCategory("produce");

        setItemCreated(false);
        };

        function handleNameChange(change)
        {
            setName(change.target.value);
        }
        function handleQuantityChange(change)
        {
            setQuantity(change.target.value);
        }
        function handleCategoryChange(change)
        {
            setCategory(change.target.value);
        };
    return(
        <main>
            <div className="min-h-screen bg-blue-gray-100 flex items-center justify-center">
                {itemCreated && (
                <div className="absolute top-0 mt-8 text-2xl text-yellow-400">
                    Item Created
                </div>
                )}
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl text-gray-800 font-bold mb-8">
                    Create New Item
                </h1>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                    <span className="text-gray-800">Item Name:</span>
                    <input
                        required
                        onChange={handleNameChange}
                        value={name}
                        className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
                    />
                    </label>
                    
                    <label className="block mb-4">
                    <span className="text-gray-800">Item Quantity:</span>
                    <input
                        type="number"
                        required
                        onChange={handleQuantityChange}
                        value={quantity}
                        min="1"
                        max="99"
                        className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
                    />
                    </label>

                    <label className="block mb-4">
                    <span className="text-gray-800">Item Category:</span>
                    <select
                        required
                        onChange={handleCategoryChange}
                        value={category}
                        className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
                    >
                        <option value="Produce">Produce</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Meat">Meat</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Canned Goods">Canned Goods</option>
                        <option value="Dry Goods">Dry Goods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Household">Household</option>
                        <option value="Other">Other</option>
                    </select>
                    </label>



                    <button
                    type="submit"
                    className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-500 rounded-md text-white"
                    >
                    Create Item
                    </button>
                </form>
                </div>
            </div>


            
        </main>
    );
}