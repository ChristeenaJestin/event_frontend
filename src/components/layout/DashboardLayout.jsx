import Sidebar from './Sidebar'
; import Navbar from './Navbar'; 
function DashboardLayout({ children, search = true, breadcrumb, placeholder }){ 
return ( 
<div className="app-shell"> 
    <Sidebar /> 
    <div> 
        <Navbar search={search} breadcrumb={breadcrumb} 
        placeholder={placeholder} /> 
        <div className="app-content">{children}</div> 
        </div> 
        </div> );
         } 
         export default DashboardLayout;