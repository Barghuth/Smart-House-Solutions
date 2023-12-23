var cart = []; // مصفوفة لتخزين المنتجات في السلة

function addToCart(productName, productPrice, boxValueId) {
    var quantity = parseInt(document.getElementById(boxValueId).innerHTML);

    // التحقق مما إذا كان المنتج موجود بالفعل في السلة
    var existingProduct = cart.find(function (item) {
        return item.name === productName;
    });

    if (existingProduct) {
        // تحديث الكمية إذا كان المنتج موجود بالفعل في السلة
        existingProduct.quantity += 1;
    } else {
        // إضافة المنتج إلى السلة إذا لم يكن موجودًا بالفعل
        var product = {
            name: productName,
            price: productPrice,
            quantity: 1 // تم تعديل هنا لتكون الكمية دائماً 1 عند إضافة منتج جديد
        };
        cart.push(product);
    }

    // عرض تفاصيل المنتج المضاف / المحدث في السلة
    displayCart();
    // عرض الكمية المحدثة بجوار المنتج
    document.getElementById(boxValueId).innerHTML = "الكمية: " + (existingProduct ? existingProduct.quantity : 1);
    // إعادة تعيين قيمة الكمية وعرض نص التأكيد
    // حساب وعرض إجمالي السلة
    calculateTotal();
}

function removeFromCart(productName) {
    // الحصول على الفهرس للمنتج في السلة
    var productIndex = cart.findIndex(function (item) {
        return item.name === productName;
    });

    if (productIndex !== -1) {
        // إزالة المنتج من السلة
        cart.splice(productIndex, 1);
        // عرض تفاصيل المنتجات المحدثة في السلة
        displayCart();
        // حساب وعرض إجمالي السلة
        calculateTotal();
    }
}

// دالة لزيادة كمية كل متج في صندوق المشتريات
function increaseValue(boxValueId) {
    var boxValue = parseInt(document.getElementById(boxValueId).innerHTML);
    boxValue++;
    document.getElementById(boxValueId).innerHTML = boxValue;
}

// دالة لإعادة تعيين قيم الصندوق
function resetValues(boxValueId) {
    // لاحاجة لتعيين قيمة الكمية هنا، سيتم تعيينها تلقائيًا في addToCart
    document.getElementById(boxValueId).innerHTML = 0;
}

// دالة لعرض تفاصيل المنتجات في السلة
function displayCart() {
    // عرض تفاصيل المنتجات في السلة
    var cartDetails = cart.map(function (item) {
        return (
            item.name +
            " - السعر: $" +
            item.price +
            " - الكمية: " +
            item.quantity +
            " - الإجمالي: $" +
            item.price * item.quantity
        );
    });
    document.getElementById("cartDisplay").innerHTML = cartDetails.join("<br>");
}

function calculateTotal() {
    // حساب إجمالي السلة مع إضافة 5% لكل منتج
    var total = cart.reduce(function (sum, item) {
        // %حساب السعر الاجمالي بعد إضافة 5
        var priceWithTax = item.price * 1.05;
        return sum + priceWithTax * item.quantity;
    }, 0);

    // عرض إجمالي السلة
    document.getElementById("totalDisplay").innerHTML = "إجمالي سعر المشتريات + ضريبة%5: $" + total.toFixed(2);
}

// دالة لعرض سلة المشترت
function showCart() {
    var cancelButton = document.getElementById("caet");
    cancelButton.classList.remove("hidden");
}
// دالة لعرض صفحة ادخال المعلومات الشخصية
function showCHK1() {
    var cancelButton = document.getElementById("Button1");
    cancelButton.classList.remove("hidden1");
}

// دالة لتحديث الصفحة
function updatePage() {

    location.reload();
}

 // دالة للتحقق من صحة النموذج
function validateForm() {
    var isFormValid = chkName() && chkNumber() && chkDate() && chkPhone() && chkEmail() && validateCaptcha();

    if (isFormValid) {
        // جمع معلومات الشراء
        var purchaseInfo = {
            cart: cart,
            total: calculateTotal()
        };

        // إضافة معلومات الشراء إلى أي عمليات إضافية هنا (مثل إرسالها إلى الخادم أو تخزينها في قاعدة البيانات)
        // في هذا المثال، سنعرضها فقط في نافذة تنبيه
        showMessage(`تمت عملية الشراء بنجاح!\n\nمعلومات الشراء:\n${formatPurchaseInfo(purchaseInfo)}`);
    }

    return isFormValid;
}

// دالة لعرض رسائل النص
function showMessage(message) {
    alert(message);
}

// دالة للتحقق من صحة الاسم
function chkName() {
    // استرجاع قيمة الحقل المدخل باستخدام معرف "name1"
    var myName = document.getElementById("name1");
    
    // البحث عن النص باستخدام تعبير منتظم يفحص ما إذا كانت الحروف الأولى عربية
    var pos = myName.value.search(/^[أ-ي][أ-ي]/);

    // في حالة عدم صحة الاسم، يظهر رسالة خطأ ويتم التركيز على حقل الاسم
    if (pos !== 0) {
        showMessage("المعلومات التي أدخلتها (" + myName.value + ") غير صالحة. \n" +
            "يجب اخال الاسم باللغة العربية.");
        myName.focus();
        myName.select();
        return false;
    } else {
        // في حالة صحة الاسم، يتم العودة بقيمة صحيحة
        return true;
    }
}

// دالة للتحقق من صحة الرقم الوطني
function chkNumber() {
    // استرجاع قيمة الحقل المدخل باستخدام معرف "num"
    var mynum = document.getElementById("num");
    
    // البحث عن النص باستخدام تعبير منتظم يفحص مطابقة الرقم الوطني للتنسيق المحدد
    var pos = mynum.value.search(/^(01|02|03|04|05|06|07|08|09|10|11|12|13|14)\d{9}$/);

    // في حالة عدم صحة الرقم الوطني، يظهر رسالة خطأ
    if (pos !== 0) {
        showMessage("الرقم الوطني الذي أدخلته (" + mynum.value + ") رقم وطني غير صالح. \n" +
            "التنسيق الصحيح للرقم الوطني:  دمشق 01-ريف دمشق 02- حمص 03-دير الرزور04-تدمر 05-درعا 06-القنيطرة 07-حلب 08-ادلب 09-الاذقية 10-طرطوس 11-حماة 12-الرقة 13-الحسكة 14 \n" +
            "يرجى إدخال أول رقمين من الرقم الوطني حسب المحافظة التي تنتمي أليها");
        
        // يتم التركيز على حقل الرقم الوطني
        mynum.focus();
        mynum.select();
        
        // العودة بقيمة خاطئة
        return false;
    } else {
        // في حالة صحة الرقم الوطني، يتم العودة بقيمة صحيحة
        return true;
    }
}

// دالة للتحقق من صحة التاريخ
function chkDate() {
    // استرجاع قيمة الحقل المدخل باستخدام معرف "date"
    var mydate = document.getElementById("date");
    
    // إنشاء كائن تاريخ للتاريخ المدخل
    var inputDate = new Date(mydate.value);
    
    // إنشاء كائن تاريخ للتاريخ الحالي
    var currentDate = new Date(); // تاريخ اليوم

    // في حالة أن التاريخ المدخل أكبر من التاريخ الحالي، يظهر رسالة خطأ
    if (inputDate > currentDate) {
        showMessage("التاريخ الذي أدخلته (" + mydate.value + ") يجب أن يكون قبل اليوم الحالي. \n" +
            "يرجى إدخال تاريخ صحيح قبل اليوم الحالي");
        
        // يتم التركيز على حقل التاريخ
        mydate.focus();
        mydate.select();
        
        // العودة بقيمة خاطئة
        return false;
    } else {
        // في حالة صحة التاريخ، يتم العودة بقيمة صحيحة
    }
}

// دالة للتحقق من صحة رقم الهاتف
function chkPhone() {
    // استرجاع قيمة الحقل المدخل باستخدام معرف "phon"
    var myPhone = document.getElementById("phon");
    
    // البحث عن النص باستخدام تعبير منتظم يفحص مطابقة رقم الهاتف للتنسيق المحدد
    var pos = myPhone.value.search(/09\d{8}$/);

    // في حالة عدم صحة رقم الهاتف، يظهر رسالة خطأ
    if (pos !== 0) {
        showMessage("الرقم الذي أدخلته (" + myPhone.value + ")  لا يطابق تنسيق أرقام شركتي MTN أو Syriatel. \n" +
            "التنسيق الصحيح : 0000-0000-09  \n" +
            "الرجاء ادخال تنسيق رقم موبايل صحيح");
        
        // يتم التركيز على حقل رقم الهاتف
        myPhone.focus();
        myPhone.select();
        
        // العودة بقيمة خاطئة
        return false;
    } else {
        // في حالة صحة رقم الهاتف، يتم العودة بقيمة صحيحة
        return true;
    }
}

// دالة للتحقق من صحة البريد الإلكتروني
function chkEmail() {
    // استرجاع قيمة الحقل المدخل باستخدام معرف "email"
    var myEmail = document.getElementById("email");
    
    // البحث عن النص باستخدام تعبير منتظم يفحص مطابقة البريد الإلكتروني للتنسيق المحدد
    var pos = myEmail.value.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    // في حالة عدم صحة البريد الإلكتروني، يظهر رسالة خطأ
    if (pos !== 0) {
        showMessage("البريد الإلكتروني الذي أدخلته (" + myEmail.value +
            ") غير صالح. \n" +
            "الرجاء ادخال عنوان بريد إلكتروني صحيح");
        
        // يتم التركيز على حقل البريد الإلكتروني
        myEmail.focus();
        myEmail.select();
        
        // العودة بقيمة خاطئة
        return false;
    } else {
        // في حالة صحة البريد الإلكتروني، يتم العودة بقيمة صحيحة
        return true;
    }
}

// دالة لإنشاء رمز تحقق عشوائي CAPTCHA 
function generateCaptcha() {
    // إنشاء سلسلة فارغة لتخزين الرمز
    var code = '';
    
    // إنشاء رمز CAPTCHA عشوائي
    for (var i = 0; i < 7; i++) {
        code += Math.floor(Math.random() * 10);
    }
    
    // العودة بالرمز الجديد
    return code;
}

// دالة لطباعة رمز التحقق CAPTCHA
function drawCaptcha() {
    // استرجاع عنصر الإدخال الذي يحتوي على رمز CAPTCHA
    var captchaInput = document.getElementById('txtCaptcha');
    
    // تعيين قيمة الإدخال بالرمز الذي تم إنشاؤه بواسطة الدالة السابقة
    captchaInput.value = generateCaptcha();
}

// دالة للتحقق من صحة رمز CAPTCHA
function validateCaptcha() {
    // استرجاع قيمة رمز CAPTCHA المتوقع من العنصر
    var captchaValue = document.getElementById('txtCaptcha').value;
    
    // استرجاع القيمة المدخلة من المستخدم
    var userInput = document.getElementById('txtInput').value;

    // في حالة أن طول القيمة المدخلة ليس 7 أو ليست رقمًا، يظهر رسالة خطأ
    if (userInput.length !== 7 || isNaN(userInput)) {
        showMessage(" رمز التحقق الذي اخلته خطء!");
        return false;
    }
    
    // العودة بقيمة تشير إلى مطابقة الرمز المدخل والرمز المتوقع
    return captchaValue === userInput;
}
