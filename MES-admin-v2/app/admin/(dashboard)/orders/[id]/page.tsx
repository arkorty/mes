import { getOrderById } from 'app/api/orders';

const OrderDetails = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await getOrderById(id);
  const order = data;
  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold mb-6">Order</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-600">
                  Customer
                </h2>
                <p>
                  Name: <strong>{order.user.name}</strong>
                </p>
                <p>
                  Email: <strong>{order.user.email}</strong>
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-600">
                  Order Status
                </h2>
                <p>{order.isPaid ? 'Paid' : 'Unpaid'}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-600">
                  Payment Method
                </h2>
                <p>{order.paymentMethod}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-600">
                  Shipping Address
                </h2>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-600">
                  Payment Status
                </h2>
                <p>{order.paymentStatus}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                Items
              </h2>
              <div className="border rounded-lg p-4 space-y-2">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sub total</span>
                  <span>${order.subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>TOTAL</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
