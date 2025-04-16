
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Shield } from "lucide-react";

interface TermsAndPolicyProps {
  isOpen: boolean;
  onClose: () => void;
  type: "terms" | "privacy";
}

const TermsAndPolicy: React.FC<TermsAndPolicyProps> = ({ isOpen, onClose, type }) => {
  const title = type === "terms" ? "Terms of Service" : "Privacy Policy";
  const icon = type === "terms" ? <FileText className="h-5 w-5 mr-2" /> : <Shield className="h-5 w-5 mr-2" />;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription>
            Last updated: April 16, 2025
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-sm text-left space-y-4">
          {type === "terms" ? (
            <>
              <h3 className="font-semibold text-base">1. Acceptance of Terms</h3>
              <p>
                By accessing or using SkyCast Weather App, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, you 
                are prohibited from using or accessing this application.
              </p>
              
              <h3 className="font-semibold text-base">2. Use License</h3>
              <p>
                Permission is granted to temporarily use this application for personal, non-commercial purposes.
                This license does not include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose</li>
                <li>Attempting to decompile or reverse engineer any software contained in the application</li>
                <li>Removing any copyright or other proprietary notations</li>
                <li>Transferring the materials to another person</li>
              </ul>
              
              <h3 className="font-semibold text-base">3. Disclaimer</h3>
              <p>
                The materials in SkyCast Weather App are provided on an 'as is' basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property.
              </p>
              
              <h3 className="font-semibold text-base">4. Weather Data Accuracy</h3>
              <p>
                Weather forecasts and data provided by this application are sourced from third-party providers 
                including OpenWeatherMap. While we strive to ensure the information is accurate, we cannot guarantee 
                the accuracy of this data. Users should always cross-reference critical weather information with official 
                government weather services.
              </p>
              
              <h3 className="font-semibold text-base">5. Limitations</h3>
              <p>
                In no event shall SkyCast Weather App or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
                the materials on SkyCast Weather App, even if we or an authorized representative has been notified orally or in 
                writing of the possibility of such damage.
              </p>
              
              <h3 className="font-semibold text-base">6. Links</h3>
              <p>
                SkyCast Weather App has not reviewed all of the sites linked to its application and is not responsible for the contents 
                of any such linked site. The inclusion of any link does not imply endorsement by SkyCast Weather App of the site. 
                Use of any such linked website is at the user's own risk.
              </p>
              
              <h3 className="font-semibold text-base">7. Modifications</h3>
              <p>
                SkyCast Weather App may revise these terms of service at any time without notice. By using this application, 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-base">1. Information Collection</h3>
              <p>
                When you use our application, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your location data (when permitted) to provide local weather information</li>
                <li>Search history of locations you've viewed</li>
                <li>Your preferences such as temperature units and default locations</li>
                <li>Device information and usage data to improve our service</li>
              </ul>
              
              <h3 className="font-semibold text-base">2. How We Use Your Information</h3>
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and maintain our weather service</li>
                <li>To personalize your experience</li>
                <li>To improve our application based on your feedback and usage patterns</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
              
              <h3 className="font-semibold text-base">3. Data Storage</h3>
              <p>
                Your preferences such as temperature units and default locations are stored locally on your device using localStorage.
                This information is not transmitted to our servers. Location searches are temporarily stored in your browser session
                to improve your experience but are not permanently saved without your consent.
              </p>
              
              <h3 className="font-semibold text-base">4. Third Party Services</h3>
              <p>
                We use OpenWeatherMap to provide weather data. When you search for a location, this request is sent to their API.
                Please review OpenWeatherMap's privacy policy for details on how they handle your data.
              </p>
              
              <h3 className="font-semibold text-base">5. Your Choices</h3>
              <p>
                You can choose to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Deny location access permissions</li>
                <li>Clear your saved preferences through your browser settings</li>
                <li>Use the application without creating an account</li>
              </ul>
              
              <h3 className="font-semibold text-base">6. Children's Privacy</h3>
              <p>
                Our application is not intended for children under 13. We do not knowingly collect personal information
                from children under 13. If you are a parent or guardian and believe your child has provided us with personal
                information, please contact us.
              </p>
              
              <h3 className="font-semibold text-base">7. Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </>
          )}
        </div>
        
        <DialogFooter className="mt-6">
          <Button onClick={onClose}>I Understand</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndPolicy;
