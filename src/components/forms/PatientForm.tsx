import { Input, Select, FormFieldWrapper } from '@/components/ui';
import { Toast } from '@/components/ui/Toast';
import { 
  FormContainer, 
  FormHeader, 
  FormContent, 
  FormGrid,
  FormActions, 
  FormButton 
} from '@/components/ui/form';
import { formFields } from '@/data/formFields';
import { usePatientForm } from '@/hooks/form/usePatientForm';
import { useToast } from '@/hooks/useToast';
import { usePatientSubmit } from '@/hooks/submission/usePatientSubmit';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from '@/hooks/useConfirmation';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';

const PatientIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const PatientForm = () => {
  const form = usePatientForm();
  const toast = useToast();
  const navigate = useNavigate();
  const confirmation = useConfirmation();
  
  const submission = usePatientSubmit({
    onSuccess: toast.showSuccess,
    onError: toast.showError,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.validate()) {
      toast.showError('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    await submission.submitPatient(form.formData, form.resetForm);
  };

  const handleCancel = async () => {
    if (form.hasData()) {
      const confirmed = await confirmation.confirm({
        title: 'Batalkan Perubahan',
        message: 'Data yang sudah diisi akan hilang dan tidak dapat dikembalikan. Apakah Anda yakin ingin membatalkan?',
        confirmText: 'Ya, Batalkan',
        cancelText: 'Tetap di Sini',
        variant: 'warning'
      });
      
      if (!confirmed) return;
    }
    navigate('/patients');
  };

  return (
    <>
      <FormContainer>
        <FormHeader 
          title="Form Pasien Masuk"
          description="Lengkapi data pasien yang akan menjalani rawat inap"
          icon={<PatientIcon />}
        />
        
        <form onSubmit={handleSubmit}>
          <FormContent>
            <FormGrid columns={2} gap="md">
              {/* ✅ SIMPLE LOOPING - Input atau Select */}
              {formFields.map((field) => (
                <div 
                  key={field.name} 
                  className={field.name === 'diagnosa' ? 'lg:col-span-2' : ''}
                >
                  <FormFieldWrapper
                    label={field.label}
                    required={field.required}
                    error={form.errors[field.name]}
                  >
                    {/* ✅ Conditional rendering: Input atau Select */}
                    {field.type === 'select' ? (
                      <Select
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form.formData[field.name]}
                        onChange={form.handleChange}
                        options={field.options || []}
                        error={form.errors[field.name]}
                      />
                    ) : (
                      <Input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form.formData[field.name]}
                        onChange={form.handleChange}
                        maxLength={field.maxLength}
                        error={form.errors[field.name]}
                      />
                    )}
                  </FormFieldWrapper>
                </div>
              ))}
            </FormGrid>
          </FormContent>

          <FormActions>
            <FormButton 
              variant="secondary" 
              onClick={handleCancel}
            >
              Batal
            </FormButton>
            
            <FormButton 
              type="submit"
              variant="primary"
              loading={submission.isSubmitting}
            >
              Simpan Pasien
            </FormButton>
          </FormActions>
        </form>
      </FormContainer>

      <Toast
        message={toast.toast.message}
        type={toast.toast.type}
        isVisible={toast.toast.isVisible}
        onClose={toast.hideToast}
      />

      <ConfirmationDialog
        isOpen={confirmation.isOpen}
        title={confirmation.options.title}
        message={confirmation.options.message}
        confirmText={confirmation.options.confirmText}
        cancelText={confirmation.options.cancelText}
        variant={confirmation.options.variant}
        onConfirm={confirmation.handleConfirm}
        onCancel={confirmation.handleCancel}
      />
    </>
  );
};
