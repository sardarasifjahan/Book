package com.hesabbook.entity.salepurchase;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Data
@NoArgsConstructor
@Entity
@Table(name = "sale_purchase")
public class SalePurchase {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;//1
    //logo
    @Lob
    private byte[] logoImage;
    @Lob
    private byte[] signatureImage;
    //Party Details
    private String partyId;
    private String partyName;
    private String partyPhone;
    private String partyBillingAddress;
    private String partyShippingAddress;
    private String partyGst;
    //type of bill
    private String billType;  //saleInvoice  //salePurchase...
    //condition
    private String addNote;
    private String addTermsAndCondition;
    // details of bills
    private String addAdditionalCharges;
    private String addDiscount;
    private String totalAmount;
    private String autoRoundOffValue;
    private String autoRoundOffMark;
    private String markFullyPaid;
    private String amountReceived;
    private String balanceAmount;
    private String paymentMode;

    private String totalTaxableAmount;   //without tax value
    private String totalGstRats;    //SGST@2.5 CGST@2.5  SGST@6  CGST@6  SGST@14 CGST@14
    //table total Values details
    private String totalTableDiscount;
    private String totalTableTax;
    private String totalTableAmount;
    //items
    @Column(name = "items", columnDefinition = "JSON",nullable = true)
    private String items;

    private String status;

    private String transactionNumber;
    private String transactionDate;
    private String originalTransactionNumber;
    //SaleInvoice//1
    private String salesInvoiceNo;//1
    private Date salesInvoiceDate;//1
    private String saleOriginalInvoiceNo;//1
    private String salesPaymentTerms;//1
    private Date salesDueDate;
    //purchase invoice//1
    private String purchaseInvNo;//1
    private Date purchaseInvDate;//1
    private String purchaseOriginalInvNo;//1
    private String PaymentTerms;//1
    private Date purchaseDueDate;
    //purchase order//1
    private String purchaseNo;//1
    private Date purchaseDate;//1
    private Date validDate;
    //purchase Return//1
    private String purchaseReturnNo;//1
    private Date purchaseReturnDate;
    //Sales Return//1
    private String salesReturnNo;//1
    private Date salesReturnDate;//1
    //Sales Quotation//1
    private String quotationNo;//1
    private Date quotationDueDate;
    private Date quotationDate;//1
    //Sales Proforma //1
    private String proformaNo;//1
    private Date proformaDate;//1
    private Date proformaExpireDate;
    //Sales Delivery
    private String deliveryNo;
    private Date deliveryDate;
    private Date deliveryDueDate;
    //Credit Note
    private String creditNoteNo;
    private Date creditNoteDate;
    //Debit Note
    private String debitNoteNo;
    private Date debitNoteDate;
    //Payment IN/OUT
    private String paymentDate;
    private String paymentNumberIn;
    private String paymentNumberOut;
    private String paymentType;//IN OUT
    private String paymentNote;
    private String amountSettled;
    private String invoiceAmount;
    @Transient
    private List<SalesPurchaseList> salesPurchaseLists;
    @Transient
    private String ledgerBalance;


    private String partyAmount;
    private String partyAmountType;//toCollect -  toPay +

    private String primary_user_id;
    private String secondary_user_id;
    private Date creationDateTime;
    @PrePersist
    public void prePersist() {
        this.creationDateTime = new Date();
    }

}
