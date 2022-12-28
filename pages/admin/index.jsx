import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddButton from "../../components/AddButton";
import PizzaList from "../../components/PizzaList";
import Add from "../../components/Add";

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);

  console.log("products", products);
  console.log("orders", orders);

  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Produkter</h1>
        {<AddButton setClose={setClose} />}

        {!close && <Add setClose={setClose} />}
      </div>

      <div className={styles.productsWrapper}>
        {pizzaList.map((pizza) => (
          <div className={styles.product} key={pizza._id}>
            <div className={styles.imageWrapper}>
              <Image
                src={pizza.img}
                width={250}
                height={250}
                alt={pizza.name}
              />
            </div>
            <div className={styles.info}>
              <h2>{pizza.title}</h2>
              <p>{pizza.desc}</p>
              <div className={styles.wrapper}>
                <p className={styles.price}>{pizza.prices[0]} $</p>
                <button
                  onClick={() => handleDelete(pizza._id)}
                  className={styles.deleteButton}
                >
                  Slett
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.wrapper}>
        <h1 className={styles.title}>Bestillinger</h1>
      </div>
      <div className={styles.ordersWrapper}>
        <table className={styles.table}>
          <thead className={styles.orderHeader}>
            <tr>
              <th>Order Id</th>
              <th style={{ textAlign: "center" }}>Products</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
              <th>Adresse</th>
              <th>test</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr
                key={order._id}
                className={styles.orderRow}
                style={{ background: index % 2 === 0 ? "#e8a08f" : "#f6d9d2" }}
              >
                <td>{order._id.slice(0, 5)}...</td>
                <td>
                  {order.products.map((product, index) => (
                    <div key={product._id} className={styles.orderProduct}>
                      <p>{index + 1}</p>
                      <div>
                        <Image
                          src={product.img}
                          width={50}
                          height={50}
                          alt={product.title}
                        />
                      </div>
                      <div>
                        <p style={{ fontWeight: "bold" }}>{product.title}</p>
                        <p>{product.desc}</p>
                        <p>Extra Options</p>
                        <ul>
                          {product.extraOptions.map((extra) => (
                            <li key={extra._id}>{extra.text}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    onClick={() => handleStatus(order._id)}
                    className={styles.deleteButton}
                  >
                    Next Stage
                  </button>
                </td>
                <td>{order.address}</td>
                <td>{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*<div className={styles.item}>*/}
      {/*  /!*<h1 className={styles.title}>Produkter</h1>*!/*/}
      {/*  /!*{<AddButton setClose={setClose} />}*!/*/}

      {/*  /!*{!close && <Add setClose={setClose} />}*!/*/}
      {/*  <table className={styles.table}>*/}
      {/*    <tbody>*/}
      {/*      <tr className={styles.trTitle}>*/}
      {/*        <th>Image</th>*/}
      {/*        <th>Id</th>*/}
      {/*        <th>Title</th>*/}
      {/*        <th>Price</th>*/}
      {/*        <th>Action</th>*/}
      {/*      </tr>*/}
      {/*    </tbody>*/}
      {/*    {pizzaList.map((product) => (*/}
      {/*      <tbody key={product._id}>*/}
      {/*        <tr className={styles.trTitle}>*/}
      {/*          <td>*/}
      {/*            <Image*/}
      {/*              src={product.img}*/}
      {/*              width={50}*/}
      {/*              height={50}*/}
      {/*              objectFit="cover"*/}
      {/*              alt=""*/}
      {/*            />*/}
      {/*          </td>*/}
      {/*          <td>{product._id.slice(0, 5)}...</td>*/}
      {/*          <td>{product.title}</td>*/}
      {/*          <td>{product.prices[0]}</td>*/}
      {/*          <td>*/}
      {/*            <button*/}
      {/*              className={styles.button}*/}
      {/*              onClick={() => handleDelete(product._id)}*/}
      {/*            >*/}
      {/*              Slett*/}
      {/*            </button>*/}
      {/*          </td>*/}
      {/*        </tr>*/}
      {/*      </tbody>*/}
      {/*    ))}*/}
      {/*  </table>*/}
      {/*</div>*/}
      {/*<div className={styles.item}>*/}
      {/*  <h1 className={styles.title}>Bestillinger</h1>*/}
      {/*  <table className={styles.table}>*/}
      {/*    <tbody>*/}
      {/*      <tr className={styles.trTitle}>*/}
      {/*        <th>Id</th>*/}
      {/*        <th>Customer</th>*/}
      {/*        <th>Total</th>*/}
      {/*        <th>Payment</th>*/}
      {/*        <th>Status</th>*/}
      {/*        <th>Action</th>*/}
      {/*        <th>Adresse</th>*/}
      {/*        <th>test</th>*/}
      {/*      </tr>*/}
      {/*    </tbody>*/}
      {/*    {orderList.map((order) => (*/}
      {/*      <tbody key={order._id}>*/}
      {/*        <tr className={styles.trTitle}>*/}
      {/*          <td>{order._id.slice(0, 5)}...</td>*/}
      {/*          <td>{order.customer}</td>*/}

      {/*          <td>${order.total}</td>*/}
      {/*          <td>*/}
      {/*            {order.method === 0 ? <span>cash</span> : <span>paid</span>}*/}
      {/*          </td>*/}
      {/*          <td>{status[order.status]}</td>*/}
      {/*          <td>*/}
      {/*            <button onClick={() => handleStatus(order._id)}>*/}
      {/*              Next Stage*/}
      {/*            </button>*/}
      {/*          </td>*/}
      {/*          <td>{order.address}</td>*/}
      {/*          <td>{}</td>*/}
      {/*        </tr>*/}
      {/*      </tbody>*/}
      {/*    ))}*/}
      {/*  </table>*/}
      {/*</div>*/}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  console.log("base url", process.env.NEXT_PUBLIC_BASE_URL);

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const adminData = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-data`
  );

  //const productRes = await axios.get("http://localhost:3000/api/products");
  // const orderRes = await axios.get("http://localhost:3000/api/orders");
  //her can du kalle GET

  return {
    props: {
      orders: adminData.data.orders,
      products: adminData.data.products,
    },
  };
};

export default Index;
