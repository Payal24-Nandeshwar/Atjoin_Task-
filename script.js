document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const photoInput = document.getElementById('photo');
    const rank = document.getElementById('rank').value;
    const idNumber = document.getElementById('userId').value;

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            generatePDF(name, idNumber, rank, e.target.result);
        };
        reader.readAsDataURL(photoInput.files[0]);
    }
});

function generatePDF(name, idNumber, rank, photoData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set font size for details
    doc.setFontSize(14);
    doc.text(`ID: ${idNumber}`, 150, 28); 
    doc.setFont('helvetica', 'bold');
    doc.text(`User Name: ${name}`, 100, 40); 

    doc.setFontSize(16);
    doc.text('Congratulations!! You have secured', 20, 90); 
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(rank, 121, 90); 
    doc.addImage(photoData, 'JPEG', 20, 20, 60, 50);

    doc.save('user_info.pdf');
}
