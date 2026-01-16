
export default function ModalLayout({ children }) {
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div className="absolute inset-0 " />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}