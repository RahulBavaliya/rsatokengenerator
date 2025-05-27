export function Features() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our RSA Token Generator includes everything you need for secure token encryption and management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">RSA Encryption</h3>
            <p className="text-muted-foreground">
              Industry-standard asymmetric encryption using RSA to ensure your tokens remain secure.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Key Management</h3>
            <p className="text-muted-foreground">
              Generate, store and manage multiple RSA key pairs for different applications or environments.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="18" y="3" width="4" height="18"></rect>
                <rect x="10" y="8" width="4" height="13"></rect>
                <rect x="2" y="13" width="4" height="8"></rect>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Advanced Options</h3>
            <p className="text-muted-foreground">
              Customize your tokens with expiry dates, custom payloads, and additional security features.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Token Verification</h3>
            <p className="text-muted-foreground">
              Easily verify tokens to ensure authenticity and check if they have expired.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Dark Mode</h3>
            <p className="text-muted-foreground">
              Choose between light and dark themes to match your preference and reduce eye strain.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Secure by Design</h3>
            <p className="text-muted-foreground">
              All encryption happens in your browser - no data is sent to our servers for maximum privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}