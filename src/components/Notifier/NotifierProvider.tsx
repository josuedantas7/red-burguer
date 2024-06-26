import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotifierProvider() {
  return (
    <div style={{position: 'absolute'}}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}