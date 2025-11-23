import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/HoverCard/hoverCard'
import { Key, Shield, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button/button'

const SecuritySettings = () => {
  return (
    
      <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
        <CardHeader className="border-b border-neutral-200/50">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-neutral-700" />
            <div>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12 border-neutral-200 hover:bg-neutral-50">
              <Key className="w-5 h-5 mr-3 text-neutral-600" />
              <div className="flex-1 text-left">
                <p className="text-neutral-900">Change Password</p>
                <p className="text-neutral-500">Update your account password</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 border-neutral-200 hover:bg-neutral-50">
              <Shield className="w-5 h-5 mr-3 text-neutral-600" />
              <div className="flex-1 text-left">
                <p className="text-neutral-900">Two-Factor Authentication</p>
                <p className="text-neutral-500">Add an extra layer of security</p>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              <Trash2 className="w-5 h-5 mr-3" />
              <div className="flex-1 text-left">
                <p>Delete Account</p>
                <p className="text-neutral-500">Permanently delete your account</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
  )
}

export default SecuritySettings