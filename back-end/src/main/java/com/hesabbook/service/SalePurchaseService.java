package com.hesabbook.service;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.hesabbook.entity.inventory.Inventory;
import com.hesabbook.entity.inventory.PartyWiseReport;
import com.hesabbook.entity.inventory.StockDetails;
import com.hesabbook.entity.party.ItemWiseReport;
import com.hesabbook.entity.party.Partner;
import com.hesabbook.entity.party.Statements;
import com.hesabbook.entity.party.Transactions;
import com.hesabbook.entity.salepurchase.SalePurchase;
import com.hesabbook.repository.InventoryRepository;
import com.hesabbook.repository.PartnerRepository;
import com.hesabbook.repository.SalePurchaseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.hesabbook.utils.CommonUtils.CREDIT_NOTE;
import static com.hesabbook.utils.CommonUtils.DEBIT_NOTE;
import static com.hesabbook.utils.CommonUtils.DELIVERY_CHALLAN;
import static com.hesabbook.utils.CommonUtils.FULL_PAID;
import static com.hesabbook.utils.CommonUtils.OPEN;
import static com.hesabbook.utils.CommonUtils.PARTIAL_PAID;
import static com.hesabbook.utils.CommonUtils.PROFORMA_INVOICE;
import static com.hesabbook.utils.CommonUtils.PURCHASE_INVOICE;
import static com.hesabbook.utils.CommonUtils.PURCHASE_ORDER;
import static com.hesabbook.utils.CommonUtils.PURCHASE_RETURN;
import static com.hesabbook.utils.CommonUtils.QUOTATION;
import static com.hesabbook.utils.CommonUtils.SALES_INVOICE;
import static com.hesabbook.utils.CommonUtils.SALES_RETURN;
import static com.hesabbook.utils.CommonUtils.UN_PAID;

@Service
public class SalePurchaseService {

    @Autowired
    private PartnerRepository partnerRepository;
    @Autowired
    private SalePurchaseRepository salePurchaseRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public SalePurchase save(SalePurchase salePurchase) {
        Double totalAmount = 0.0;
        Double amountReceived = 0.0;
        Double balanceAmount = 0.0;
        String totalAmountString = salePurchase.getTotalAmount();
        String amountReceivedString = salePurchase.getAmountReceived();
        String balanceAmountString = salePurchase.getBalanceAmount();
        if (totalAmountString != null && !totalAmountString.isEmpty()) {
            totalAmount = Double.parseDouble(totalAmountString);
        }
        if (amountReceivedString != null && !amountReceivedString.isEmpty()) {
            amountReceived = Double.parseDouble(amountReceivedString);
        }
        if (balanceAmountString != null && !balanceAmountString.isEmpty()) {
            balanceAmount = Double.parseDouble(balanceAmountString);
        }
        if (totalAmount > 0.0) {
            Double leftAmount = totalAmount - amountReceived;
            if (leftAmount == 0.0) {
                salePurchase.setStatus(FULL_PAID);
            } else if (leftAmount.equals(totalAmount)) {
                salePurchase.setStatus(UN_PAID);
            } else if (leftAmount > 0.0) {
                salePurchase.setStatus(PARTIAL_PAID);
            }
        }
        switch (salePurchase.getBillType()) {
            case SALES_INVOICE, DEBIT_NOTE, PURCHASE_RETURN -> updateItemQuantity(salePurchase, "Reduce");
            case SALES_RETURN, CREDIT_NOTE, PURCHASE_INVOICE -> updateItemQuantity(salePurchase, "Increment");
            case PURCHASE_ORDER, DELIVERY_CHALLAN, QUOTATION, PROFORMA_INVOICE -> salePurchase.setStatus(OPEN);
        }
        SalePurchase salePurchaseReturn = salePurchaseRepository.save(salePurchase);

        //Party
        Statements statements = new Statements();
        Transactions transaction = new Transactions();
        ItemWiseReport itemWiseReport = new ItemWiseReport();
        //Inventory
        PartyWiseReport partyWiseReport = new PartyWiseReport();
        StockDetails stockDetails = new StockDetails();
        switch (salePurchase.getBillType()) {
            case SALES_INVOICE -> {
                //Party
                statements.setSpNo(salePurchaseReturn.getId());
                statements.setBillType(SALES_INVOICE);
                statements.setDebit(salePurchase.getTotalAmount());
                statements.setCredit(salePurchase.getBalanceAmount());
                statements.setReceivedBalance(salePurchase.getAmountReceived());
                statements.setBalanceAmount(salePurchase.getBalanceAmount());
                statements.setTotalAmount(salePurchase.getTotalAmount());
                transaction.setTransactionType(SALES_INVOICE);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus(salePurchase.getStatus());
                itemWiseReport.setSpNo(salePurchaseReturn.getId());

                partyWiseReport.setPartyNo(salePurchaseReturn.getPartyId() != null ? Integer.valueOf(salePurchaseReturn.getPartyId()) : 0);
                partyWiseReport.setPartyName(salePurchaseReturn.getPartyName());
                partyWiseReport.setSpNo(salePurchaseReturn.getId());
                partyWiseReport.setSaleIncDec(null);
                partyWiseReport.setSaleAmount(null);
                partyWiseReport.setSaleQuantity(null);
                partyWiseReport.setPurchaseAmount(null);
                partyWiseReport.setPurchaseIncDec(null);
                partyWiseReport.setPurchaseQuantity(null);

                Type inventoryListType = new TypeToken<List<Inventory>>() {
                }.getType();
                List<Inventory> inventoryList = new Gson().fromJson(salePurchase.getItems(), inventoryListType);
                if (inventoryList == null || inventoryList.isEmpty()) {
                    System.out.println("Invalid input: inventory list is null or empty");
                }
                inventoryList.forEach(x -> {
                    itemWiseReport.setItemNo(x.getId());
                    itemWiseReport.setItemName(x.getItem());
                    itemWiseReport.setItemCode(x.getItemCode());
                    BigDecimal salePrice = new BigDecimal(x.getSalePrice());
                    BigDecimal saleAmount = salePrice.multiply(new BigDecimal(x.getQuantity()));
                    itemWiseReport.setSaleAmount(String.valueOf(saleAmount)); // Set sale amount
                    itemWiseReport.setSaleQuantity(String.valueOf(x.getQuantity()));
                    itemWiseReport.setSaleIncDec("-");
                   /* itemWiseReport.setPurchaseAmount();
                    itemWiseReport.setPurchaseQuantity();
                    itemWiseReport.setPurchaseIncDec();*/

                    //Inventory
                    stockDetails.setItemCode(Integer.valueOf(x.getItemCode()));
                    stockDetails.setItemCode(Integer.valueOf(x.getItemCode()));
                    stockDetails.setSpNo(salePurchaseReturn.getId());
                    stockDetails.setBillType(SALES_INVOICE);
                    stockDetails.setQuantityType("-");
                    if (x.getQuantity() != null) {
                        Double quantityDouble = Double.valueOf(x.getQuantity());
                        Double closingStock = Double.valueOf(x.getTotalStock());
                        stockDetails.setQuantity(String.valueOf(quantityDouble));
                        stockDetails.setClosingStock(String.valueOf(closingStock - quantityDouble));
                    }
                    ;
                    CompletableFuture.runAsync(() -> {
                        Optional<Inventory> inventories = inventoryRepository.findById(x.getId());
                        if (inventories.isPresent()) {
                            Inventory inventory = inventories.get();
                            //Stock
                            List<StockDetails> stockDetailsList = new ArrayList<>();
                            stockDetailsList.addAll(inventory.getStockDetailsList());
                            stockDetailsList.addAll(Arrays.asList(stockDetails));

                            inventory.setStockDetailsList(stockDetailsList);
                            inventory.setTotalStock(stockDetails.getClosingStock());
                            inventoryRepository.save(inventory);
                        }
                    });

                });
            }
            case SALES_RETURN -> {
                //Party
                statements.setSpNo(salePurchaseReturn.getId());
                statements.setBillType(SALES_RETURN);
                statements.setDebit(salePurchase.getAmountReceived());
                statements.setCredit(salePurchase.getTotalAmount());
                statements.setReceivedBalance(salePurchase.getAmountReceived());
                statements.setBalanceAmount(salePurchase.getBalanceAmount());
                statements.setTotalAmount(salePurchase.getTotalAmount());
                transaction.setTransactionType(SALES_RETURN);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus(salePurchase.getStatus());
                itemWiseReport.setSpNo(salePurchaseReturn.getId());
                //Inventory
                stockDetails.setSpNo(salePurchaseReturn.getId());
                stockDetails.setBillType(SALES_RETURN);
                stockDetails.setQuantityType("-");
                stockDetails.setQuantity(null);
                stockDetails.setClosingStock(null);

                partyWiseReport.setPartyNo(salePurchaseReturn.getPartyId() != null ? Integer.valueOf(salePurchaseReturn.getPartyId()) : 0);
                partyWiseReport.setPartyName(salePurchaseReturn.getPartyName());
                partyWiseReport.setSpNo(salePurchaseReturn.getId());
                partyWiseReport.setSaleIncDec(null);
                partyWiseReport.setSaleAmount(null);
                partyWiseReport.setSaleQuantity(null);
                partyWiseReport.setPurchaseAmount(null);
                partyWiseReport.setPurchaseIncDec(null);
                partyWiseReport.setPurchaseQuantity(null);
                Type inventoryListType = new TypeToken<List<Inventory>>() {
                }.getType();
                List<Inventory> inventoryList = new Gson().fromJson(salePurchase.getItems(), inventoryListType);
                if (inventoryList == null || inventoryList.isEmpty()) {
                    System.out.println("Invalid input: inventory list is null or empty");
                }
                inventoryList.forEach(x -> {
                    itemWiseReport.setItemNo(x.getId());
                    itemWiseReport.setItemName(x.getItem());
                    itemWiseReport.setItemCode(x.getItemCode());
                    BigDecimal salePrice = new BigDecimal(x.getSalePrice());
                    BigDecimal saleAmount = salePrice.multiply(new BigDecimal(x.getQuantity()));
                    itemWiseReport.setSaleAmount(String.valueOf(saleAmount)); // Set sale amount
                    itemWiseReport.setSaleQuantity(String.valueOf(x.getQuantity()));
                    itemWiseReport.setSaleIncDec("-");
                   /* itemWiseReport.setPurchaseAmount();
                    itemWiseReport.setPurchaseQuantity();
                    itemWiseReport.setPurchaseIncDec();*/

                    //Inventory
                    stockDetails.setItemCode(Integer.valueOf(x.getItemCode()));
                    stockDetails.setSpNo(salePurchaseReturn.getId());
                    stockDetails.setBillType(SALES_INVOICE);
                    stockDetails.setQuantityType("-");
                    if (x.getQuantity() != null) {
                        Double quantityDouble = Double.valueOf(x.getQuantity());
                        Double closingStock = Double.valueOf(x.getTotalStock());
                        stockDetails.setQuantity(String.valueOf(quantityDouble));
                        stockDetails.setClosingStock(String.valueOf(closingStock + quantityDouble));
                    }
                    ;
                    CompletableFuture.runAsync(() -> {
                        Optional<Inventory> inventories = inventoryRepository.findById(x.getId());
                        if (inventories.isPresent()) {
                            Inventory inventory = inventories.get();
                            //Stock
                            List<StockDetails> stockDetailsList = new ArrayList<>();
                            stockDetailsList.addAll(inventory.getStockDetailsList());
                            stockDetailsList.addAll(Arrays.asList(stockDetails));

                            inventory.setStockDetailsList(stockDetailsList);
                            inventory.setTotalStock(stockDetails.getClosingStock());
                            inventoryRepository.save(inventory);
                        }
                    });
                });
            }
            case CREDIT_NOTE -> {
                //Party
                statements.setSpNo(salePurchaseReturn.getId());
                statements.setBillType(CREDIT_NOTE);
                statements.setDebit(salePurchase.getAmountReceived());
                statements.setCredit(salePurchase.getTotalAmount());
                statements.setReceivedBalance(salePurchase.getAmountReceived());
                statements.setBalanceAmount(salePurchase.getBalanceAmount());
                statements.setTotalAmount(salePurchase.getTotalAmount());
                transaction.setTransactionType(CREDIT_NOTE);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus(salePurchase.getStatus());
                itemWiseReport.setSpNo(salePurchaseReturn.getId());
                //Inventory
                stockDetails.setSpNo(salePurchaseReturn.getId());
                stockDetails.setBillType(SALES_RETURN);
                stockDetails.setQuantityType("+");
                stockDetails.setQuantity(null);
                stockDetails.setClosingStock(null);

                partyWiseReport.setPartyNo(salePurchaseReturn.getPartyId() != null ? Integer.valueOf(salePurchaseReturn.getPartyId()) : 0);
                partyWiseReport.setPartyName(salePurchaseReturn.getPartyName());
                partyWiseReport.setSpNo(salePurchaseReturn.getId());
                partyWiseReport.setSaleIncDec(null);
                partyWiseReport.setSaleAmount(null);
                partyWiseReport.setSaleQuantity(null);
                partyWiseReport.setPurchaseAmount(null);
                partyWiseReport.setPurchaseIncDec(null);
                partyWiseReport.setPurchaseQuantity(null);
                Type inventoryListType = new TypeToken<List<Inventory>>() {
                }.getType();
                List<Inventory> inventoryList = new Gson().fromJson(salePurchase.getItems(), inventoryListType);
                if (inventoryList == null || inventoryList.isEmpty()) {
                    System.out.println("Invalid input: inventory list is null or empty");
                }
                inventoryList.forEach(x -> {
                    itemWiseReport.setItemNo(x.getId());
                    itemWiseReport.setItemName(x.getItem());
                    itemWiseReport.setItemCode(x.getItemCode());
                    BigDecimal salePrice = new BigDecimal(x.getSalePrice());
                    BigDecimal saleAmount = salePrice.multiply(new BigDecimal(x.getQuantity()));
                    itemWiseReport.setSaleAmount(String.valueOf(saleAmount)); // Set sale amount
                    itemWiseReport.setSaleQuantity(String.valueOf(x.getQuantity()));
                    itemWiseReport.setSaleIncDec("-");
                   /* itemWiseReport.setPurchaseAmount();
                    itemWiseReport.setPurchaseQuantity();
                    itemWiseReport.setPurchaseIncDec();*/

                    //Inventory
                    stockDetails.setItemCode(Integer.valueOf(x.getItemCode()));
                    stockDetails.setSpNo(salePurchaseReturn.getId());
                    stockDetails.setBillType(SALES_INVOICE);
                    stockDetails.setQuantityType("-");
                    if (x.getQuantity() != null) {
                        Double quantityDouble = Double.valueOf(x.getQuantity());
                        Double closingStock = Double.valueOf(x.getTotalStock());
                        stockDetails.setQuantity(String.valueOf(quantityDouble));
                        stockDetails.setClosingStock(String.valueOf(closingStock + quantityDouble));
                    }
                    ;
                    CompletableFuture.runAsync(() -> {
                        Optional<Inventory> inventories = inventoryRepository.findById(x.getId());
                        if (inventories.isPresent()) {
                            Inventory inventory = inventories.get();
                            //Stock
                            List<StockDetails> stockDetailsList = new ArrayList<>();
                            stockDetailsList.addAll(inventory.getStockDetailsList());
                            stockDetailsList.addAll(Arrays.asList(stockDetails));

                            inventory.setStockDetailsList(stockDetailsList);
                            inventory.setTotalStock(stockDetails.getClosingStock());
                            inventoryRepository.save(inventory);
                        }
                    });
                });
            }
            case DELIVERY_CHALLAN -> {
                //Party
                transaction.setTransactionType(DELIVERY_CHALLAN);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus("NA");
            }
            case PROFORMA_INVOICE -> {
                //Party
                transaction.setTransactionType(PROFORMA_INVOICE);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus("NA");
            }
            case QUOTATION -> {
                //Party
                transaction.setTransactionType(QUOTATION);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus("NA");
            }
            case PURCHASE_RETURN -> {
                //Party
                statements.setSpNo(salePurchaseReturn.getId());
                statements.setBillType(PURCHASE_RETURN);
                statements.setDebit(salePurchase.getTotalAmount());
                statements.setCredit(salePurchase.getAmountReceived());
                statements.setReceivedBalance(salePurchase.getAmountReceived());
                statements.setBalanceAmount(salePurchase.getBalanceAmount());
                statements.setTotalAmount(salePurchase.getTotalAmount());
                transaction.setTransactionType(PURCHASE_RETURN);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus(salePurchase.getStatus());
                itemWiseReport.setSpNo(salePurchaseReturn.getId());
                //Inventory
                stockDetails.setSpNo(salePurchaseReturn.getId());
                stockDetails.setBillType(PURCHASE_RETURN);
                stockDetails.setQuantityType("-");
                stockDetails.setQuantity(null);
                stockDetails.setClosingStock(null);

                partyWiseReport.setPartyNo(salePurchaseReturn.getPartyId() != null ? Integer.valueOf(salePurchaseReturn.getPartyId()) : 0);
                partyWiseReport.setPartyName(salePurchaseReturn.getPartyName());
                partyWiseReport.setSpNo(salePurchaseReturn.getId());
                partyWiseReport.setSaleIncDec(null);
                partyWiseReport.setSaleAmount(null);
                partyWiseReport.setSaleQuantity(null);
                partyWiseReport.setPurchaseAmount(null);
                partyWiseReport.setPurchaseIncDec(null);
                partyWiseReport.setPurchaseQuantity(null);
                Type inventoryListType = new TypeToken<List<Inventory>>() {
                }.getType();
                List<Inventory> inventoryList = new Gson().fromJson(salePurchase.getItems(), inventoryListType);
                if (inventoryList == null || inventoryList.isEmpty()) {
                    System.out.println("Invalid input: inventory list is null or empty");
                }
                inventoryList.forEach(x -> {
                    itemWiseReport.setItemNo(x.getId());
                    itemWiseReport.setItemName(x.getItem());
                    itemWiseReport.setItemCode(x.getItemCode());
                    BigDecimal salePrice = new BigDecimal(x.getSalePrice());
                    BigDecimal saleAmount = salePrice.multiply(new BigDecimal(x.getQuantity()));
                    itemWiseReport.setPurchaseAmount(String.valueOf(saleAmount)); // Set sale amount
                    itemWiseReport.setPurchaseQuantity(String.valueOf(x.getQuantity()));
                    itemWiseReport.setSaleIncDec("-");
                   /* itemWiseReport.setPurchaseAmount();
                    itemWiseReport.setPurchaseQuantity();
                    itemWiseReport.setPurchaseIncDec();*/

                    //Inventory
                    stockDetails.setItemCode(Integer.valueOf(x.getItemCode()));
                    stockDetails.setSpNo(salePurchaseReturn.getId());
                    stockDetails.setBillType(SALES_INVOICE);
                    stockDetails.setQuantityType("-");
                    if (x.getQuantity() != null) {
                        Double quantityDouble = Double.valueOf(x.getQuantity());
                        Double closingStock = Double.valueOf(x.getTotalStock());
                        stockDetails.setQuantity(String.valueOf(quantityDouble));
                        stockDetails.setClosingStock(String.valueOf(closingStock - quantityDouble));
                    }
                    ;
                    CompletableFuture.runAsync(() -> {
                        Optional<Inventory> inventories = inventoryRepository.findById(x.getId());
                        if (inventories.isPresent()) {
                            Inventory inventory = inventories.get();
                            //Stock
                            List<StockDetails> stockDetailsList = new ArrayList<>();
                            stockDetailsList.addAll(inventory.getStockDetailsList());
                            stockDetailsList.addAll(Arrays.asList(stockDetails));

                            inventory.setStockDetailsList(stockDetailsList);
                            inventory.setTotalStock(stockDetails.getClosingStock());
                            inventoryRepository.save(inventory);
                        }
                    });
                });
            }
            case PURCHASE_INVOICE -> {
                //Party
                statements.setSpNo(salePurchaseReturn.getId());
                statements.setBillType(PURCHASE_INVOICE);
                statements.setDebit(salePurchase.getAmountReceived());
                statements.setCredit(salePurchase.getTotalAmount());
                statements.setReceivedBalance(salePurchase.getAmountReceived());
                statements.setBalanceAmount(salePurchase.getBalanceAmount());
                statements.setTotalAmount(salePurchase.getTotalAmount());
                transaction.setTransactionType(PURCHASE_INVOICE);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus(salePurchase.getStatus());
                itemWiseReport.setSpNo(salePurchaseReturn.getId());
                //Inventory
                stockDetails.setSpNo(salePurchaseReturn.getId());
                stockDetails.setBillType(PURCHASE_INVOICE);
                stockDetails.setQuantityType("+");
                stockDetails.setQuantity(null);
                stockDetails.setClosingStock(null);

                partyWiseReport.setPartyNo(salePurchaseReturn.getPartyId() != null ? Integer.valueOf(salePurchaseReturn.getPartyId()) : 0);
                partyWiseReport.setPartyName(salePurchaseReturn.getPartyName());
                partyWiseReport.setSpNo(salePurchaseReturn.getId());
                partyWiseReport.setSaleIncDec(null);
                partyWiseReport.setSaleAmount(null);
                partyWiseReport.setSaleQuantity(null);
                partyWiseReport.setPurchaseAmount(null);
                partyWiseReport.setPurchaseIncDec(null);
                partyWiseReport.setPurchaseQuantity(null);
                Type inventoryListType = new TypeToken<List<Inventory>>() {
                }.getType();
                List<Inventory> inventoryList = new Gson().fromJson(salePurchase.getItems(), inventoryListType);
                if (inventoryList == null || inventoryList.isEmpty()) {
                    System.out.println("Invalid input: inventory list is null or empty");
                }
                inventoryList.forEach(x -> {
                    itemWiseReport.setItemNo(x.getId());
                    itemWiseReport.setItemName(x.getItem());
                    itemWiseReport.setItemCode(x.getItemCode());
                    BigDecimal salePrice = new BigDecimal(x.getSalePrice());
                    BigDecimal saleAmount = salePrice.multiply(new BigDecimal(x.getQuantity()));
                    itemWiseReport.setPurchaseAmount(String.valueOf(saleAmount)); // Set sale amount
                    itemWiseReport.setPurchaseQuantity(String.valueOf(x.getQuantity()));
                    itemWiseReport.setSaleIncDec("-");
                   /* itemWiseReport.setPurchaseAmount();
                    itemWiseReport.setPurchaseQuantity();
                    itemWiseReport.setPurchaseIncDec();*/

                    //Inventory
                    stockDetails.setItemCode(Integer.valueOf(x.getItemCode()));
                    stockDetails.setSpNo(salePurchaseReturn.getId());
                    stockDetails.setBillType(SALES_INVOICE);
                    stockDetails.setQuantityType("-");
                    if (x.getQuantity() != null) {
                        Double quantityDouble = Double.valueOf(x.getQuantity());
                        Double closingStock = Double.valueOf(x.getTotalStock());
                        stockDetails.setQuantity(String.valueOf(quantityDouble));
                        stockDetails.setClosingStock(String.valueOf(closingStock + quantityDouble));
                    }
                    ;
                    CompletableFuture.runAsync(() -> {
                        Optional<Inventory> inventories = inventoryRepository.findById(x.getId());
                        if (inventories.isPresent()) {
                            Inventory inventory = inventories.get();
                            //Stock
                            List<StockDetails> stockDetailsList = new ArrayList<>();
                            stockDetailsList.addAll(inventory.getStockDetailsList());
                            stockDetailsList.addAll(Arrays.asList(stockDetails));

                            inventory.setStockDetailsList(stockDetailsList);
                            inventory.setTotalStock(stockDetails.getClosingStock());
                            inventoryRepository.save(inventory);
                        }
                    });
                });
            }
            case PURCHASE_ORDER -> {
                //Party
                transaction.setTransactionType(PURCHASE_ORDER);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus("NA");
            }
            case DEBIT_NOTE -> {
                //Party
                statements.setSpNo(salePurchaseReturn.getId());
                statements.setBillType(DEBIT_NOTE);
                statements.setDebit(salePurchase.getTotalAmount());
                statements.setCredit(salePurchase.getAmountReceived());
                statements.setReceivedBalance(salePurchase.getAmountReceived());
                statements.setBalanceAmount(salePurchase.getBalanceAmount());
                statements.setTotalAmount(salePurchase.getTotalAmount());
                transaction.setTransactionType(DEBIT_NOTE);
                transaction.setSpNo(salePurchaseReturn.getId());
                transaction.setAmount(salePurchase.getTotalAmount());
                transaction.setStatus(salePurchase.getStatus());
                itemWiseReport.setSpNo(salePurchaseReturn.getId());
                //Inventory
                stockDetails.setSpNo(salePurchaseReturn.getId());
                stockDetails.setBillType(DEBIT_NOTE);
                stockDetails.setQuantityType("-");
                stockDetails.setQuantity(null);
                stockDetails.setClosingStock(null);

                partyWiseReport.setPartyNo(salePurchaseReturn.getPartyId() != null ? Integer.valueOf(salePurchaseReturn.getPartyId()) : 0);
                partyWiseReport.setPartyName(salePurchaseReturn.getPartyName());
                partyWiseReport.setSpNo(salePurchaseReturn.getId());
                partyWiseReport.setSaleIncDec(null);
                partyWiseReport.setSaleAmount(null);
                partyWiseReport.setSaleQuantity(null);
                partyWiseReport.setPurchaseAmount(null);
                partyWiseReport.setPurchaseIncDec(null);
                partyWiseReport.setPurchaseQuantity(null);
                Type inventoryListType = new TypeToken<List<Inventory>>() {
                }.getType();
                List<Inventory> inventoryList = new Gson().fromJson(salePurchase.getItems(), inventoryListType);
                if (inventoryList == null || inventoryList.isEmpty()) {
                    System.out.println("Invalid input: inventory list is null or empty");
                }
                inventoryList.forEach(x -> {
                    itemWiseReport.setItemNo(x.getId());
                    itemWiseReport.setItemName(x.getItem());
                    itemWiseReport.setItemCode(x.getItemCode());
                    BigDecimal salePrice = new BigDecimal(x.getSalePrice());
                    BigDecimal saleAmount = salePrice.multiply(new BigDecimal(x.getQuantity()));
                    itemWiseReport.setPurchaseAmount(String.valueOf(saleAmount)); // Set sale amount
                    itemWiseReport.setPurchaseQuantity(String.valueOf(x.getQuantity()));
                    itemWiseReport.setSaleIncDec("+");
                   /* itemWiseReport.setPurchaseAmount();
                    itemWiseReport.setPurchaseQuantity();
                    itemWiseReport.setPurchaseIncDec();*/

                    //Inventory
                    stockDetails.setItemCode(Integer.valueOf(x.getItemCode()));
                    stockDetails.setSpNo(salePurchaseReturn.getId());
                    stockDetails.setBillType(SALES_INVOICE);
                    stockDetails.setQuantityType("-");
                    Double closingStock;
                    if (x.getQuantity() != null) {
                        Double quantityDouble = Double.valueOf(x.getQuantity());
                        closingStock = Double.valueOf(x.getTotalStock());
                        stockDetails.setQuantity(String.valueOf(quantityDouble));
                        stockDetails.setClosingStock(String.valueOf(closingStock - quantityDouble));
                    }
                    CompletableFuture.runAsync(() -> {
                        Optional<Inventory> inventories = inventoryRepository.findById(x.getId());
                        if (inventories.isPresent()) {
                            Inventory inventory = inventories.get();
                            //Stock Details
                            List<StockDetails> stockDetailsList = new ArrayList<>();
                            stockDetailsList.addAll(inventory.getStockDetailsList());
                            stockDetailsList.addAll(Arrays.asList(stockDetails));

                            inventory.setStockDetailsList(stockDetailsList);
                            inventory.setTotalStock(stockDetails.getClosingStock());
                            inventoryRepository.save(inventory);
                        }
                    });
                });
            }
        }

        CompletableFuture.runAsync(() -> {
            Optional<Partner> partner = partnerRepository.findById(Integer.valueOf(salePurchase.getPartyId()));
            if (partner.isPresent()) {
                try {
                    Partner actualPartner = partner.get();

                    List<Transactions> transactionsList = new ArrayList<>();
                    List<Statements> statementsList = new ArrayList<>();
                    List<ItemWiseReport> itemWiseReportList = new ArrayList<>();

                    transactionsList.addAll(actualPartner.getTransactionsList());
                    transactionsList.addAll(Arrays.asList(transaction));

                    statementsList.addAll(actualPartner.getStatementsList());
                    statementsList.addAll(Arrays.asList(statements));

                    itemWiseReportList.addAll(actualPartner.getItemWiseReportList());
                    itemWiseReportList.addAll(Arrays.asList(itemWiseReport));

                    actualPartner.setTransactionsList(transactionsList);
                    actualPartner.setStatementsList(statementsList);
                    actualPartner.setItemWiseReportList(itemWiseReportList);
                    partnerRepository.save(actualPartner);
                } catch (Exception exception) {
                    System.out.println("Exception " + exception);
                }
            }
        });

        return salePurchaseReturn;


    }

    private void updateItemQuantity(SalePurchase salePurchase, String redInc) {
        if (salePurchase == null || salePurchase.getItems() == null || redInc == null) {
            System.out.println("Invalid input: salePurchase, items, or redInc is null");
            return;
        }
        Type inventoryListType = new TypeToken<List<Inventory>>() {
        }.getType();
        List<Inventory> inventoryList = new Gson().fromJson(salePurchase.getItems(), inventoryListType);
        if (inventoryList == null || inventoryList.isEmpty()) {
            System.out.println("Invalid input: inventory list is null or empty");
            return;
        }
        switch (redInc) {
            case "Reduce" -> {
                inventoryList.forEach(inventory -> {
                    if (inventory != null && inventory.getQuantity() != null) {
                        try {
                            inventoryRepository.updateSubtractQuantity(String.valueOf(inventory.getQuantity()), inventory.getItem(), inventory.getId());
                        } catch (Exception exception) {
                            System.out.println(exception);
                        }
                    }
                });
            }
            case "Increment" -> {
                inventoryList.forEach(inventory -> {
                    if (inventory != null && inventory.getQuantity() != null) {
                        try {
                            inventoryRepository.updateAddQuantity(String.valueOf(inventory.getQuantity()), inventory.getItem(), inventory.getId());
                        } catch (Exception exception) {
                            System.out.println(exception);
                        }
                    }
                });
            }
            default -> {
                System.out.println("Invalid redInc value");
            }
        }
    }

    public SalePurchase update(SalePurchase entity) {
        return salePurchaseRepository.save(entity);
    }

    public void delete(SalePurchase entity) {
        salePurchaseRepository.delete(entity);
    }

    public void delete(Integer id) {
        salePurchaseRepository.deleteById(id);
    }


    public List<SalePurchase> findALl() {
        return salePurchaseRepository.findAll();
    }

    public List<SalePurchase> findByPrimaryUserId(String id) {
        return salePurchaseRepository.findByPrimaryUserId(id);
    }

}
