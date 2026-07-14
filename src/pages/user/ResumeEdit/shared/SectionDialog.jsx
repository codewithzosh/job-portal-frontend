import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../../../components/ui/dialog'
import { Button } from '../../../../components/ui/button'

const SectionDialog = ({title,children,open,onClose,onSave}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
                {children}
            </div>
            <DialogFooter>
                <Button variant='outline' onClick={onClose}>Cancel</Button>
                <Button onClick={onSave}>Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default SectionDialog