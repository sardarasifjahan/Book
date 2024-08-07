package com.hesabbook.service.party;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import com.hesabbook.batch.BatchUpdate;
import com.hesabbook.entity.party.Address;
import com.hesabbook.entity.ProductKeyValuePair;
import com.hesabbook.entity.party.Partner;
import com.hesabbook.entity.party.Statements;
import com.hesabbook.repository.AddressRepository;
import com.hesabbook.repository.PartnerRepository;
import com.hesabbook.service.ProductKeyValueService;
import com.hesabbook.utils.BusinessResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.hesabbook.utils.CommonUtils.SALES_INVOICE;
import lombok.SneakyThrows;

@Service
public class PartyService {
    @Autowired
    private PartnerRepository partnerRepository;
    @Autowired
    private BatchUpdate batchUpdate;

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private ProductKeyValueService productKeyValueService;

    public Partner save(Partner entity) {
        List<ProductKeyValuePair> productKeyValuePairList = Arrays.asList(extracted("company", entity.getCompany(), entity),
                extracted("category", entity.getPartyCategory(), entity));
        productKeyValueService.saveAll(productKeyValuePairList);
        Statements statements = new Statements();
        statements.setBillType("OPENING_BALANCE");
        if (StringUtils.isNotBlank(entity.getOpeningBalanceType())) {
            if (entity.getOpeningBalanceType().equalsIgnoreCase("To Collect"))
                statements.setDebit(entity.getOpeningBalance());
            //statements.setCredit(salePurchase.getAmountReceived());
        } else if (entity.getOpeningBalanceType().equalsIgnoreCase("To Pay")) {
          //  statements.setDebit(entity);
            statements.setCredit(entity.getOpeningBalance());
        }
        statements.setTotalAmount(entity.getOpeningBalance());
        entity.setStatementsList(Arrays.asList(statements));
        return partnerRepository.save(entity);
    }

    private ProductKeyValuePair extracted(String company, String entity, Partner entity1) {
        ProductKeyValuePair productkeyValuePair = new ProductKeyValuePair();
        productkeyValuePair.setKes(company);
        productkeyValuePair.setValue(entity);
        productkeyValuePair.setPrimary_user_id(entity1.getPrimary_user_id());
        productkeyValuePair.setSecondary_user_id(entity1.getSecondary_user_id());
        return productkeyValuePair;
        //  productKeyValueService.save(productkeyValuePair);
    }

    public Partner update(Partner entity) {
        return partnerRepository.save(entity);
    }

    public void delete(Partner entity) {
        partnerRepository.delete(entity);
    }

    public void delete(Integer id) {
        partnerRepository.deleteById(id);
    }

    public Partner find(Integer id) {
        Optional<Partner> PartnerOptional = partnerRepository.findById(id);
        return PartnerOptional.orElse(null);
    }

    public List<Partner> findAll() {
        return partnerRepository.findAll();
    }

    public List<Partner> findByPrimaryPartnerId(String id) {
        return partnerRepository.findByPrimaryUserId(id);
    }

    public void deleteInBatch(List<Partner> Partners) {
        partnerRepository.deleteInBatch(Partners);
    }

    @SneakyThrows
    public BusinessResponse saveBulk(List<LinkedHashMap<String, String>> linkedHashMap, String primaryUserId, String secondaryUserId) {
        BusinessResponse businessResponse = new BusinessResponse();
        List<Partner> partner = linkedHashMap.stream()
                .map(part -> mapToPartner(part, primaryUserId, secondaryUserId))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        List<Partner> partnerList = partnerRepository.saveAllAndFlush(partner);
        businessResponse.setCode(200);
        businessResponse.setStatus("SUCCESS");
        businessResponse.setResponse(partnerList);
        return businessResponse;
    }


    public Partner mapToPartner(LinkedHashMap<String, String> linkedHashMap, String primaryUserId, String secondaryUserId) {
        Partner partner = new Partner();
        partner.setPName(linkedHashMap.get("col0"));
        partner.setMobileNumber(linkedHashMap.get("col1"));
        partner.setEmail(linkedHashMap.get("col2"));
        partner.setBillingAddress(linkedHashMap.get("col3"));
        partner.setShippingAddress(linkedHashMap.get("col4"));
        partner.setCompany(linkedHashMap.get("col5"));
        partner.setGstNumber(linkedHashMap.get("col6"));
        partner.setPartyCategory(linkedHashMap.get("col7"));
        partner.setCreditLimit(linkedHashMap.get("col8"));
        partner.setCreditPeriod(linkedHashMap.get("col9"));
        partner.setCreditPeriodType(linkedHashMap.get("col10"));
        partner.setOpeningBalance(linkedHashMap.get("col11"));
        partner.setOpeningBalanceType(linkedHashMap.get("col12"));
        boolean flag = areAllFieldsNull(partner);
        partner.setPrimary_user_id(primaryUserId);
        partner.setSecondary_user_id(secondaryUserId);
        Statements statements = new Statements();
        statements.setBillType("OPENING_BALANCE");
        if (StringUtils.isNotBlank(partner.getOpeningBalanceType())) {
            if (partner.getOpeningBalanceType().equalsIgnoreCase("To Collect"))
                statements.setDebit(partner.getOpeningBalance());
            //statements.setCredit(salePurchase.getAmountReceived());
        } else if (partner.getOpeningBalanceType().equalsIgnoreCase("To Pay")) {
            //  statements.setDebit(entity);
            statements.setCredit(partner.getOpeningBalance());
        }
        statements.setTotalAmount(partner.getOpeningBalance());
        partner.setStatementsList(Arrays.asList(statements));
        if (!flag) {
            return partner;
        } else {
            return null;
        }
    }

    public boolean areAllFieldsNull(Partner obj) {
        Class<?> clazz = obj.getClass();
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            try {
                if (field.get(obj) != null) {
                    return false;
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }
        return true;
    }

    public void savePartnerAddress(Address address, Integer addressId) {
        Optional<Address> address1 = addressRepository.findById(addressId);
        if (address1.isPresent()) {
            Address address2 = address1.get();
            address2.setAddress(address.getAddress());
            address2.setCity(address.getCity());
            address2.setZip(address.getZip());
            address2.setState(address.getState());
            addressRepository.save(address2);
        }
    }


    public void deletePartnerAddress(Integer addressId) {
        addressRepository.deleteById(addressId);
    }
}
