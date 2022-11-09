import React, { useEffect, useState } from "react";

const TestingApiTime = () => {
  const fetchData = async () => {
    //this method will take much time to complete because the requests are made one by one, means when one is completed then next req is going to make another
    const productsresBad = await fetch("https://dummyjson.com/products?limit=500");
    const usersresBad = await fetch("https://dummyjson.com/users?limit=500");
    console.log(await productsresBad.json(), await usersresBad.json());

    //this method will take less time to complete because the requests are made in the background at the same time
    const productsres = fetch("https://dummyjson.com/products?limit=500");
    const usersres = fetch("https://dummyjson.com/users?limit=500");
    const [products, users] = await Promise.all([productsres, usersres]);
    console.log(await products.json(), await users.json());

    // or we can use .then() chaning the request which will result the same above result (less time taken)
    fetch("https://dummyjson.com/products?limit=500").then((res) => console.log(res));
    fetch("https://dummyjson.com/users?limit=500").then((res) => console.log(res));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>TestingApiTime</div>;
};

export default TestingApiTime;
